# TaskFlow: Proje Tanıtım Dokümanı

## 1. Projenin Amacı

TaskFlow, bir yazılım ekibinin görevlerini, bu görevlerin sorumlularını ve ilerleme durumlarını tek bir yerden takip edebilmesi için geliştirilmiş bir REST API'dir. Bu proje, Node.js ve Express.js eğitimi boyunca öğrenilen routing, middleware, CRUD operasyonları ve JSON ile veri yönetimi konularını uygulamalı olarak göstermek amacıyla hazırlanmıştır.

## 2. Senaryo

Bir yazılım şirketi, ekip içindeki görevleri ve çalışanların sorumluluklarını takip etmek istemektedir. Geliştirilen sistem; görevlerin oluşturulmasını, bir çalışana atanmasını, önceliklendirilmesini ve durumunun takip edilmesini sağlar. Sistem arayüz içermez, tamamen REST API mantığında çalışır ve Postman gibi araçlarla ya da herhangi bir istemci uygulamasıyla kullanılabilir.

## 3. Sistemin Özellikleri

- Yeni görev ekleme
- Tüm görevleri listeleme
- Belirli bir görevin detayını görüntüleme
- Görev bilgilerini güncelleme (durum, öncelik, atanan kişi dahil)
- Görev silme
- Tüm isteklerin metot, adres ve zaman damgasıyla kaydedilmesi (Logger middleware)

## 4. Kullanılan Teknolojiler

| Teknoloji                   | Kullanım amacı                                 |
| --------------------------- | ---------------------------------------------- |
| Node.js                     | Çalışma ortamı                                 |
| Express.js                  | Sunucu ve routing                              |
| JSON dosyası (`tasks.json`) | Veri saklama                                   |
| nodemon                     | Geliştirme sırasında otomatik yeniden başlatma |
| Postman                     | API testleri                                   |

## 5. Veri Modeli

Her görev aşağıdaki alanlardan oluşur:

| Alan          | Tür               | Açıklama                                                                    |
| ------------- | ----------------- | --------------------------------------------------------------------------- |
| `id`          | Sayı              | Sunucu belirler. Son görevin id'sine 1 eklenir, liste boşsa 1'dir.          |
| `title`       | Metin             | Görev başlığı. **Zorunludur.**                                              |
| `description` | Metin             | Görev açıklaması.                                                           |
| `priority`    | Metin             | Öncelik (`high`, `medium`, `low`). Gönderilmezse `medium` olur.             |
| `assignee`    | Metin             | Görevin atandığı çalışan.                                                   |
| `status`      | Metin             | Durum (`pending`, `in-progress`, `completed`). Yeni görev `pending` başlar. |
| `createdAt`   | Metin (ISO tarih) | Oluşturulma zamanı. Sunucu belirler, değişmez.                              |
| `updatedAt`   | Metin (ISO tarih) | Son güncellenme zamanı. Her güncellemede yenilenir.                         |

## 6. API Uçları

| Metot  | Adres        | Açıklama                                   | Başarılı | Hata               |
| ------ | ------------ | ------------------------------------------ | -------- | ------------------ |
| POST   | `/tasks`     | Yeni görev ekler                           | 201      | 400 (başlık yoksa) |
| GET    | `/tasks`     | Tüm görevleri listeler                     | 200      | -                  |
| GET    | `/tasks/:id` | Belirli görevi getirir                     | 200      | 404 (görev yoksa)  |
| PUT    | `/tasks/:id` | Görevi günceller, gelmeyen alanlar korunur | 200      | 404 (görev yoksa)  |
| DELETE | `/tasks/:id` | Görevi siler                               | 200      | 404 (görev yoksa)  |

## 7. Mimari

Bir istek sistemde şu yolu izler:

**İstemci (Postman) → server.js → Logger → Routes → Controller → tasks.json**

- **server.js:** Uygulamayı başlatır, JSON okuma ve logger middleware'lerini ve rotaları bağlar.
- **Logger middleware:** Her isteğin metodunu, adresini ve zamanını konsola yazar, sonra isteği devam ettirir.
- **Routes:** Metot ve adrese göre isteği doğru controller fonksiyonuna yönlendirir, iş mantığı içermez.
- **Controller:** Görevleri okur, ekler, günceller veya siler ve cevabı hazırlar.
- **tasks.json:** Görevlerin kalıcı olarak saklandığı veri dosyasıdır.

Bu ayrım sayesinde her katmanın tek bir sorumluluğu vardır. Bir hata çıktığında hangi dosyaya bakılacağı bellidir.

## 8. Klasör Yapısı

```
taskflow/
├── controllers/taskController.js   # Görev işlemlerinin mantığı
├── data/tasks.json                 # Veri dosyası
├── docs/                           # Doküman ve test ekran görüntüleri
├── middleware/logger.js            # Logger middleware
├── routes/taskRoutes.js            # Rota tanımları
├── server.js                       # Giriş noktası
└── package.json
```

## 9. Test

Beş uç noktanın tamamı (ekleme, listeleme, detay, güncelleme, silme) ve hata durumları (400, 404) Postman ile test edilmiştir. Ekran görüntüleri `docs/screenshots` klasöründedir.

## 10. Yapılabilecek Geliştirmeler

Bu sürümde yer almayan, ileride eklenebilecek özellikler: durum ve önceliğe göre filtreleme, arama, sayfalama, gelişmiş validation middleware ve raporlama servisleri.
