from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils import compute_beam_analysis, generate_dome_geometry, grpdet ,steiner,calc_I,calc_T,calc_L,calc_U ,calc_Z,calc_Box, CATEGORIES, to_si, from_si, get_all_conversions # Eski kod
from .models import AkademikPersonel, Hakkimizda 
from .serializers import  AkademikPersonelSerializer, HakkimizdaSerializer
import traceback
import numpy as np # Numpy'ı matematiksel özetler için kullanacağız


@api_view(['POST'])
def calculate_dome(request):
    try:
        data = request.data 
        params = {
            'type': int(data.get('type', 5)),
            'span': float(data.get('span', 31.78)),
            'height': float(data.get('height', 7.0)),
            'freq': int(data.get('freq', 5))
        }
        
        # 1. Matematiksel hesaplamaları yaps
        dome = generate_dome_geometry(params)
        dome = grpdet(dome)
        
        # A. Özet Bilgiler (Hocanın info_dict kısmı)
        lengths = dome['lengths']
        info_summary = {
            'dome_type': dome['poly_name'],
            'frequency': int(dome['freq']),
            'node_count': int(dome['nodenum']),
            'member_count': int(dome['memnum']),
            'group_count': int(dome['group_count']),
            'total_length': round(float(dome['total_length']), 4),
            'min_length': round(float(np.min(lengths)), 4),
            'max_length': round(float(np.max(lengths)), 4),
        }

        # B. Düğümler Tablosu (df_nodes kısmı)
        # Veri formatı: [[NodeID, X, Y, Z], ...] -> Saf Python listesine çevriliyor
        nodes_table = []
        for node in dome['nodes']:
            nodes_table.append({
                'id': int(node[0]),
                'x': round(float(node[1]), 4),
                'y': round(float(node[2]), 4),
                'z': round(float(node[3]), 4),
            })

        # C. Elemanlar Tablosu (df_members kısmı)
        # Veri formatı: [[MemID, Node1, Node2, ...], ...]
        members_table = []
        for mem in dome['members']:
            members_table.append({
                'id': int(mem[0]),
                'node1': int(mem[1]),
                'node2': int(mem[2]),
            })

        # D. Renkli Çizim Grupları (NUMPY KORUMASI)
        groups_dict = {}
        if 'groups' in dome:
            for k, v in dome.get('groups', {}).items():
                groups_dict[str(k)] = [int(i) for i in v]

        # Sonuçları güvenle React'e gönder
        return Response({
            "status": "success",
            "info_summary": info_summary,
            "nodes_table": nodes_table,
            "members_table": members_table,
            # Çizim için gerekli ham veriler (Daha temiz)
            "nodes_raw": dome['nodes'].tolist(), 
            "members_raw": dome['members'].tolist(),
            "groups_draw": groups_dict
        })
        
    except Exception as e:
        print("\n--- HATA BAŞLANGICI ---")
        traceback.print_exc()
        print("--- HATA BİTİŞİ ---\n")
        return Response({"status": "error", "message": str(e)}, status=400)

@api_view(['GET']) # React bizden sadece veri 'isteyeceği' için GET kullanıyoruz
def ekip_listesi(request):
    # Sırasına göre tüm personeli veritabanından çek
    personeller = AkademikPersonel.objects.all().order_by('sira')
    # Verileri JSON formatına çevir (many=True çünkü birden fazla kişi olabilir)
    serializer = AkademikPersonelSerializer(personeller, many=True)
    return Response(serializer.data)
@api_view(['GET'])
def hakkimizda(request):
   # Veritabanındaki ilk (ve tek) hakkımızda kaydını alır
    hakkimizda = Hakkimizda.objects.first()
    if hakkimizda:
        serializer = HakkimizdaSerializer(hakkimizda)
        return Response(serializer.data)
    return Response({"error": "İçerik henüz eklenmedi."}, status=404)
@api_view(['GET'])
def ekip_detay(request, pk):
    try:
        personel = AkademikPersonel.objects.get(pk=pk)
        serializer = AkademikPersonelSerializer(personel)
        return Response(serializer.data)
    except AkademikPersonel.DoesNotExist:
        return Response({"error": "Personel bulunamadı."}, status=404)
        


@api_view(['POST'])
def calculate_beam(request):
    try:
        data = request.data
        L = float(data.get('L', 6.0))
        loads = data.get('loads', [])
        
        x, V, M, RA, RB, total_F = compute_beam_analysis(L, loads)
        
        # Kritik noktaları bul
        idx_vmax, idx_vmin = np.argmax(V), np.argmin(V)
        idx_mmax = np.argmax(np.abs(M))

        return Response({
            "status": "success",
            "L": L,
            "RA": round(RA, 3),
            "RB": round(RB, 3),
            "total_F": round(total_F, 3),
            "max_values": {
                "V_max": {"val": round(float(V[idx_vmax]), 3), "x": round(float(x[idx_vmax]), 3)},
                "V_min": {"val": round(float(V[idx_vmin]), 3), "x": round(float(x[idx_vmin]), 3)},
                "M_max": {"val": round(float(M[idx_mmax]), 3), "x": round(float(x[idx_mmax]), 3)},
            },
            "arrays": {
                "x": np.round(x, 3).tolist(),
                "V": np.round(V, 3).tolist(),
                "M": np.round(M, 3).tolist()
            }
        })
    except Exception as e:
        import traceback
        traceback.print_exc()
        return Response({"status": "error", "message": str(e)}, status=400)
    
@api_view(['POST'])
def calculate_composite(request):
    try:
        data = request.data
        section_type = data.get('section', 'I')
        
        if section_type == 'I':
            res = calc_I(float(data.get('bf', 200)), float(data.get('tf', 15)), float(data.get('hw', 200)), float(data.get('tw', 10)))
        elif section_type == 'T':
            res = calc_T(float(data.get('bf', 150)), float(data.get('tf', 15)), float(data.get('hw', 180)), float(data.get('tw', 10)))
        elif section_type == 'L':
            res = calc_L(float(data.get('b', 120)), float(data.get('h', 120)), float(data.get('t1', 12)), float(data.get('t2', 12)))
        elif section_type == 'U':
            res = calc_U(float(data.get('bf', 150)), float(data.get('tf', 12)), float(data.get('hw', 150)), float(data.get('tw', 10)))
        elif section_type == 'Z':
            res = calc_Z(float(data.get('bf', 100)), float(data.get('tf', 12)), float(data.get('hw', 150)), float(data.get('tw', 8)))
        elif section_type == 'Box':
            res = calc_Box(float(data.get('B', 200)), float(data.get('H', 200)), float(data.get('tx', 12)), float(data.get('ty', 10)))
        else:
            return Response({"status": "error", "message": "Geçersiz kesit"}, status=400)
            
        return Response({"status": "success", "data": res})
    except Exception as e:
        return Response({"status": "error", "message": str(e)}, status=400)    
# backend/api/views.py içine eklenecek
from .utils import CATEGORIES, to_si, from_si, get_all_conversions

@api_view(['POST', 'GET'])
def unit_converter(request):
    # GET isteği gelirse React'e kategorileri ve birimleri gönder (Dropdown'lar için)
    if request.method == 'GET':
        cats = {k: {"tr": v["tr"], "en": v["en"], "units": list(v["units"].keys())} for k, v in CATEGORIES.items()}
        return Response({"status": "success", "categories": cats})
    
    # POST isteği gelirse çeviri hesaplamasını yap
    try:
        data = request.data
        cat = data.get('category', 'length')
        val = float(data.get('value', 1.0))
        from_u = data.get('from_unit', 'm')
        to_u = data.get('to_unit', 'cm')

        si_val = to_si(val, from_u, cat)
        res_val = from_si(si_val, to_u, cat)
        table_data = get_all_conversions(val, from_u, cat)

        return Response({
            "status": "success", 
            "result": round(res_val, 6), 
            "table": table_data
        })
    except Exception as e:
        return Response({"status": "error", "message": str(e)}, status=400)    
    
    


