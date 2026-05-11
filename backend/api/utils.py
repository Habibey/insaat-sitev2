import numpy as np
import math

POLYHEDRON_NAMES = {
    3: 'Tetrahedron', 4: 'Octahedron', 5: 'Icosahedron',
    6: 'Hexahedron', 7: 'Heptahedron', 8: 'Octahedron_8', 9: 'Enneahedron'
}

def generate_dome_geometry(params):
    t = int(params.get('type', 5))
    if t not in range(3, 10):
        raise ValueError('Geçersiz yüz sayısı. 3 ile 9 arasında olmalıdır.')
    
    dome = params.copy()
    dome['poly_name'] = POLYHEDRON_NAMES.get(t, f'Polyhedron_{t}')
    return polyhedron_base(dome, t)

def polyhedron_base(dome, face):
    sp = float(dome['span'])
    ht = float(dome['height'])
    fr = int(dome['freq'])
    
    R = ((sp / 2) ** 2 / ht + ht) / 2
    if ht > R:
        raise ValueError('Kubbe yüksekliği yarıçapı aşamaz.')
        
    alpha = np.degrees(np.arcsin(sp / (2 * R)))
    phi = alpha / fr
    dome['radius'], dome['angle'], dome['fr_angle'] = R, alpha, phi

    ds = sum(range(1, fr + 1)) * face + 1
    dome['nodenum'] = ds
    nodes = np.zeros((ds, 4))

    es = (sum(range(1, fr + 1)) * 3 - fr) * face
    dome['memnum'] = es
    eleman = np.zeros((es, 2), dtype=int)
    mem = np.zeros((es, 5))

    nodes[0] = [1, 0, 0, ht]
    dx = [nodes[0:1]]

    j = 0
    for i in range(1, fr + 1):
        rx = R * np.sin(np.radians(phi * i))
        ar = 2 * np.pi / (face * i)
        aci = np.arange(0, 2 * np.pi, ar)
        ll = np.arange(j + 1, j + 1 + len(aci))

        nodes[ll, 0] = ll + 1
        nodes[ll, 1] = rx * np.cos(aci)
        nodes[ll, 2] = rx * np.sin(aci)
        nodes[ll, 3] = R * np.cos(np.radians(phi * i)) - (R - ht)

        j += len(aci)
        dx.append(nodes[ll])

    dome['nodes'] = nodes
    idx = 0
    top_idx = int(dx[0][0, 0]) - 1
    ring_idx = (dx[1][:, 0] - 1).astype(int)

    for nid in ring_idx:
        eleman[idx] = [nid, top_idx]
        idx += 1

    for i in range(1, fr):
        d2 = (dx[i + 1][::i + 1, 0] - 1).astype(int)
        d1 = (dx[i][::i, 0] - 1).astype(int)
        for a, b in zip(d1, d2):
            eleman[idx] = [a, b]
            idx += 1

    for i in range(1, fr + 1):
        k = (dx[i][:, 0] - 1).astype(int)
        for a, b in zip(k, np.roll(k, -1)):
            eleman[idx] = [a, b]
            idx += 1

    for i in range(1, fr):
        d2 = (dx[i + 1][:, 0] - 1).astype(int)
        d1 = (dx[i][:, 0] - 1).astype(int)
        d2x = (dx[i + 1][::i + 1, 0] - 1).astype(int)
        tmp = np.hstack([np.setdiff1d(d2, d2x)[-1:], np.setdiff1d(d2, d2x)])
        for a, t1, t2 in zip(d1, tmp, np.roll(tmp, -1)):
            eleman[idx] = [a, t1]
            eleman[idx + 1] = [a, t2]
            idx += 2

    mem[:, 0] = np.arange(1, len(eleman) + 1)
    mem[:, 1:3] = eleman + 1
    dome['members'] = mem
    return dome

def grpdet(dome, tol=1e-6):
    pairs = dome['members'][:, 1:3].astype(int) - 1
    lengths = np.linalg.norm(
        dome['nodes'][pairs[:, 0], 1:4] - dome['nodes'][pairs[:, 1], 1:4],
        axis=1
    )
    groups, unique = {}, []
    for idx, L in enumerate(lengths):
        for gid, UL in enumerate(unique):
            if abs(L - UL) < tol:
                groups.setdefault(gid, []).append(idx)
                break
        else:
            unique.append(L)
            groups[len(unique) - 1] = [idx]
            
    dome['groups'] = groups
    
   
    dome['lengths'] = lengths
    dome['group_count'] = len(groups)
    dome['total_length'] = float(np.sum(lengths))
 
    
    return dome
# --- KİRİŞ ANALİZİ FONKSİYONLARI ---

def load_intensity(xi, ld):
    lt = ld.get("type")
    if lt == "point": return 0.0
    
    a, b = float(ld.get("a", 0.0)), float(ld.get("b", 0.0))
    if b <= a or not (a <= xi <= b): return 0.0
    
    t = (xi - a) / (b - a)

    if lt == "udl":
        return float(ld.get("q", 0.0))
    elif lt == "linear":
        return float(ld.get("q1", 0.0)) + t * (float(ld.get("q2", 0.0)) - float(ld.get("q1", 0.0)))
    elif lt == "parabolic":
        p = float(ld.get("x_peak_rel", 0.5))
        q_min, q_max = float(ld.get("q_min", 0.0)), float(ld.get("q_max", 0.0))
        dq = q_max - q_min
        if p <= 0.0: return q_max + (q_min - q_max) * t
        elif p >= 1.0: return q_min + (q_max - q_min) * t
        else:
            edge = max(p, 1.0 - p)
            return q_min + dq * max(0.0, 1.0 - ((t - p) / edge) ** 2)
    return 0.0

def compute_beam_analysis(L, loads, N=1000):
    # NumPy 2.0 uyumluluğu
    trapz = getattr(np, "trapezoid", None) or getattr(np, "trapz", None)

    x = np.linspace(0, L, N)
    dx = x[1] - x[0]

    # 1. Reaksiyon Kuvvetlerini Hesapla (RA, RB)
    sum_F = 0.0; sum_MA = 0.0
    for ld in loads:
        if ld.get("type") == "point":
            P, a = float(ld.get("P", 0.0)), float(ld.get("a", 0.0))
            sum_F += P
            sum_MA += P * a
        else:
            qv = np.array([load_intensity(xi, ld) for xi in x])
            Fd = trapz(qv, x)
            xc = trapz(qv * x, x) / Fd if abs(Fd) > 1e-12 else 0.0
            sum_F += Fd
            sum_MA += Fd * xc
            
    RB = sum_MA / L if L > 0 else 0.0
    RA = sum_F - RB

    # 2. Kesme Kuvveti (V) ve Eğilme Momenti (M) Diyagramlarını Hesapla
    q_tot = np.zeros(N)
    for ld in loads:
        if ld.get("type") != "point":
            q_tot += np.array([load_intensity(xi, ld) for xi in x])

    V = np.zeros(N); V[0] = RA
    for i in range(1, N):
        V[i] = V[i-1] - 0.5 * (q_tot[i-1] + q_tot[i]) * dx

    for ld in loads:
        if ld.get("type") == "point":
            a = float(ld.get("a", 0.0))
            V[x >= a] -= float(ld.get("P", 0.0))

    M = np.zeros(N)
    for i in range(1, N):
        M[i] = M[i-1] + 0.5 * (V[i-1] + V[i]) * dx

    return x, V, M, RA, RB, sum_F


# --- BİLEŞİK KESİT (STEINER) FONKSİYONLARI ---

def steiner(parts):
    A_tot = sum(p["A"] for p in parts)
    xc = sum(p["A"] * p["xc"] for p in parts) / A_tot if A_tot else 0
    yc = sum(p["A"] * p["yc"] for p in parts) / A_tot if A_tot else 0

    Ix_tot, Iy_tot = 0.0, 0.0
    tablo = []
    
    for p in parts:
        dy = p["yc"] - yc
        dx = p["xc"] - xc
        Ix_p = p["Ix0"] + p["A"] * (dy**2)
        Iy_p = p["Iy0"] + p["A"] * (dx**2)
        Ix_tot += Ix_p
        Iy_tot += Iy_p
        
        tablo.append({
            "label": p["label"],
            "A": round(p["A"], 2), "yc": round(p["yc"], 2), "dy": round(dy, 2),
            "Ix0": round(p["Ix0"], 2), "Ad2": round(p["A"] * (dy**2), 2),
            "Ix_p": round(Ix_p, 2),
            "rect": p.get("rect", {}) # React Plotly için çizim koordinatları
        })
        
    return {"A_tot": A_tot, "xc": xc, "yc": yc, "Ix_tot": Ix_tot, "Iy_tot": Iy_tot, "tablo": tablo}

def calc_I(bf, tf, hw, tw):
    H = hw + 2 * tf
    p1 = {"label": "Üst Başlık", "A": bf*tf, "xc": bf/2, "yc": H - tf/2, "Ix0": bf*tf**3/12, "Iy0": tf*bf**3/12, "rect": {"x0": 0, "y0": H-tf, "x1": bf, "y1": H}}
    p2 = {"label": "Gövde", "A": tw*hw, "xc": bf/2, "yc": tf + hw/2, "Ix0": tw*hw**3/12, "Iy0": hw*tw**3/12, "rect": {"x0": (bf-tw)/2, "y0": tf, "x1": (bf+tw)/2, "y1": tf+hw}}
    p3 = {"label": "Alt Başlık", "A": bf*tf, "xc": bf/2, "yc": tf/2, "Ix0": bf*tf**3/12, "Iy0": tf*bf**3/12, "rect": {"x0": 0, "y0": 0, "x1": bf, "y1": tf}}
    return steiner([p1, p2, p3])

def calc_T(bf, tf, hw, tw):
    H = hw + tf
    p1 = {"label": "Başlık", "A": bf*tf, "xc": bf/2, "yc": hw + tf/2, "Ix0": bf*tf**3/12, "Iy0": tf*bf**3/12, "rect": {"x0": 0, "y0": hw, "x1": bf, "y1": H}}
    p2 = {"label": "Gövde", "A": tw*hw, "xc": bf/2, "yc": hw/2, "Ix0": tw*hw**3/12, "Iy0": hw*tw**3/12, "rect": {"x0": (bf-tw)/2, "y0": 0, "x1": (bf+tw)/2, "y1": hw}}
    return steiner([p1, p2])

def calc_L(b, h, t1, t2):
    p1 = {"label": "Yatay Kanat", "A": b*t1, "xc": b/2, "yc": t1/2, "Ix0": b*t1**3/12, "Iy0": t1*b**3/12, "rect": {"x0": 0, "y0": 0, "x1": b, "y1": t1}}
    p2 = {"label": "Dikey Kanat", "A": t2*(h-t1), "xc": t2/2, "yc": t1 + (h-t1)/2, "Ix0": t2*(h-t1)**3/12, "Iy0": (h-t1)*t2**3/12, "rect": {"x0": 0, "y0": t1, "x1": t2, "y1": h}}
    return steiner([p1, p2])

def calc_U(bf, tf, hw, tw):
    H = hw + tf
    p1 = {"label": "Taban", "A": bf*tf, "xc": bf/2, "yc": tf/2, "Ix0": bf*tf**3/12, "Iy0": tf*bf**3/12, "rect": {"x0": 0, "y0": 0, "x1": bf, "y1": tf}}
    p2 = {"label": "Sol Web", "A": tw*hw, "xc": tw/2, "yc": tf+hw/2, "Ix0": tw*hw**3/12, "Iy0": hw*tw**3/12, "rect": {"x0": 0, "y0": tf, "x1": tw, "y1": tf+hw}}
    p3 = {"label": "Sağ Web", "A": tw*hw, "xc": bf-tw/2, "yc": tf+hw/2, "Ix0": tw*hw**3/12, "Iy0": hw*tw**3/12, "rect": {"x0": bf-tw, "y0": tf, "x1": bf, "y1": tf+hw}}
    return steiner([p1, p2, p3])

def calc_Z(bf, tf, hw, tw):
    H = hw + 2 * tf
    # Üst başlık (Sağa doğru uzanır)
    p1 = {"label": "Üst Başlık", "A": bf*tf, "xc": bf/2, "yc": H - tf/2, "Ix0": bf*tf**3/12, "Iy0": tf*bf**3/12, "rect": {"x0": 0, "y0": H-tf, "x1": bf, "y1": H}}
    # Gövde
    p2 = {"label": "Gövde", "A": tw*hw, "xc": tw/2, "yc": tf + hw/2, "Ix0": tw*hw**3/12, "Iy0": hw*tw**3/12, "rect": {"x0": 0, "y0": tf, "x1": tw, "y1": tf+hw}}
    # Alt başlık (Sola doğru uzanır)
    p3 = {"label": "Alt Başlık", "A": bf*tf, "xc": tw/2 - bf/2, "yc": tf/2, "Ix0": bf*tf**3/12, "Iy0": tf*bf**3/12, "rect": {"x0": tw-bf, "y0": 0, "x1": tw, "y1": tf}}
    return steiner([p1, p2, p3])

def calc_Box(B, H, tx, ty):
    hi = H - 2 * tx
    # Alt plaka
    p1 = {"label": "Alt Plaka", "A": B*tx, "xc": B/2, "yc": tx/2, "Ix0": B*tx**3/12, "Iy0": tx*B**3/12, "rect": {"x0": 0, "y0": 0, "x1": B, "y1": tx}}
    # Üst plaka
    p2 = {"label": "Üst Plaka", "A": B*tx, "xc": B/2, "yc": H - tx/2, "Ix0": B*tx**3/12, "Iy0": tx*B**3/12, "rect": {"x0": 0, "y0": H-tx, "x1": B, "y1": H}}
    # Sol web
    p3 = {"label": "Sol Web", "A": ty*hi, "xc": ty/2, "yc": tx + hi/2, "Ix0": ty*hi**3/12, "Iy0": hi*ty**3/12, "rect": {"x0": 0, "y0": tx, "x1": ty, "y1": H-tx}}
    # Sağ web
    p4 = {"label": "Sağ Web", "A": ty*hi, "xc": B - ty/2, "yc": tx + hi/2, "Ix0": ty*hi**3/12, "Iy0": hi*ty**3/12, "rect": {"x0": B-ty, "y0": tx, "x1": B, "y1": H-tx}}
    return steiner([p1, p2, p3, p4])
# --- BİRİM DÖNÜŞTÜRÜCÜ FONKSİYONLARI ---

CATEGORIES = {
    "length": {
        "tr": "Uzunluk", "en": "Length", "si": "m",
        "units": {
            "mm": ("Milimetre", "Millimeter", 1e-3), "cm": ("Santimetre", "Centimeter", 1e-2),
            "m": ("Metre", "Meter", 1.0), "km": ("Kilometre", "Kilometer", 1e3),
            "in": ("İnç", "Inch", 0.0254), "ft": ("Fit", "Foot", 0.3048),
            "yd": ("Yarda", "Yard", 0.9144), "mi": ("Mil", "Mile", 1609.344),
        }
    },
    "area": {
        "tr": "Alan", "en": "Area", "si": "m²",
        "units": {
            "mm²": ("Milimetre kare", "Square mm", 1e-6), "cm²": ("Santimetre kare", "Square cm", 1e-4),
            "m²": ("Metre kare", "Square m", 1.0), "km²": ("Kilometre kare", "Square km", 1e6),
            "in²": ("İnç kare", "Square inch", 6.4516e-4), "ft²": ("Fit kare", "Square foot", 0.092903),
            "ha": ("Hektar", "Hectare", 1e4), "ac": ("Akre", "Acre", 4046.856),
        }
    },
    "volume": {
        "tr": "Hacim", "en": "Volume", "si": "m³",
        "units": {
            "lt": ("Litre", "Liter", 1e-3), "m³": ("Metre küp", "Cubic m", 1.0),
            "in³": ("İnç küp", "Cubic inch", 1.6387e-5), "gal": ("Galon (ABD)", "US Gallon", 3.78541e-3),
        }
    },
    "mass": {
        "tr": "Kütle", "en": "Mass", "si": "kg",
        "units": {
            "g": ("Gram", "Gram", 1e-3), "kg": ("Kilogram", "Kilogram", 1.0),
            "t": ("Ton", "Tonne", 1e3), "lb": ("Pound", "Pound", 0.453592),
        }
    },
    "force": {
        "tr": "Kuvvet", "en": "Force", "si": "N",
        "units": {
            "N": ("Newton", "Newton", 1.0), "kN": ("Kilonewton", "Kilonewton", 1e3),
            "kgf": ("Kilogram-kuvvet", "Kilogram-force", 9.80665), "lbf": ("Pound-kuvvet", "Pound-force", 4.44822),
        }
    },
    "pressure": {
        "tr": "Basınç / Gerilme", "en": "Pressure / Stress", "si": "Pa",
        "units": {
            "Pa": ("Pascal", "Pascal", 1.0), "kPa": ("Kilopascal", "Kilopascal", 1e3),
            "MPa": ("Megapascal", "Megapascal", 1e6), "N/mm²": ("N/mm²", "N/mm²", 1e6),
            "bar": ("Bar", "Bar", 1e5), "psi": ("psi", "psi", 6894.76),
        }
    },
    "temperature": {
        "tr": "Sıcaklık", "en": "Temperature", "si": "K",
        "units": {
            "°C": ("Celsius", "Celsius", None), "°F": ("Fahrenheit", "Fahrenheit", None),
            "K": ("Kelvin", "Kelvin", None)
        }
    }
}

def to_si(value, unit, cat_key):
    if cat_key == "temperature":
        if unit == "°C": return value + 273.15
        if unit == "°F": return (value - 32) * 5/9 + 273.15
        if unit == "K":  return value
    return value * CATEGORIES[cat_key]["units"][unit][2]

def from_si(si_value, unit, cat_key):
    if cat_key == "temperature":
        if unit == "°C": return si_value - 273.15
        if unit == "°F": return (si_value - 273.15) * 9/5 + 32
        if unit == "K":  return si_value
    return si_value / CATEGORIES[cat_key]["units"][unit][2]

def get_all_conversions(value, from_unit, cat_key):
    si_val = to_si(value, from_unit, cat_key)
    results = []
    for uk, udata in CATEGORIES[cat_key]["units"].items():
        try:
            c_val = from_si(si_val, uk, cat_key)
            results.append({"unit": uk, "name": udata[0], "value": round(c_val, 6)})
        except:
            pass
    return results



def calculate_section_properties(shape, params):
    res = {}
    if shape == "rectangle":
        b, h = float(params.get('b', 0)), float(params.get('h', 0))
        res = {
            "A": b * h,
            "xc": b / 2,
            "yc": h / 2,
            "Ix0": (b * h**3) / 12,
            "Iy0": (h * b**3) / 12,
            "Ip": ((b * h**3) / 12) + ((h * b**3) / 12)
        }
    elif shape == "circle":
        r = float(params.get('r', 0))
        res = {
            "A": math.pi * r**2,
            "xc": r,
            "yc": r,
            "Ix0": (math.pi * r**4) / 4,
            "Iy0": (math.pi * r**4) / 4,
            "Ip": (math.pi * r**4) / 2
        }
    return res

