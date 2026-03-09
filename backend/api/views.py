from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils import generate_dome_geometry, grpdet # Eski kod
from .models import AkademikPersonel
from .serializers import  AkademikPersonelSerializer
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
        
        # 1. Matematiksel hesaplamaları yap
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


