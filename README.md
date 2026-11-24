# TaskFlow

TaskFlow, Node.js ve Express.js ile geliştirilmiş bir görev yönetim sistemi REST API'sidir. Görev ekleme, listeleme, detay görüntüleme, güncelleme ve silme işlemlerini destekler. Veriler bir JSON dosyasında saklanır, ayrıca veritabanı kurulumu gerekmez.

## Gereksinimler

- [Node.js](https://nodejs.org) (proje Node.js v26 ile geliştirilmiştir, güncel LTS sürümleri de çalışır)
- npm (Node.js ile birlikte gelir)
- [Postman](https://www.postman.com/) (API'yi test etmek için)

```bash
node -v
npm -v
```

## Kurulum

1. Repoyu indirin:

```bash
git clone REPO_ADRESI
```

2. Proje klasörüne girin:

```bash
cd taskflow
```

3. Bağımlılıkları kurun:

```bash
npm install
```

## Çalıştırma

Geliştirme modu (dosya değişince sunucu otomatik yeniden başlar):

```bash
npm run dev
```

Normal mod:

```bash
npm start
```

Sunucu `http://localhost:3000` adresinde çalışır. Terminalde şu mesajı görürsünüz:

```
Sunucu http://localhost:3000 adresinde çalışıyor
```

## API Uçları

| Metot  | Adres        | Açıklama                   | Başarılı | Hata               |
| ------ | ------------ | -------------------------- | -------- | ------------------ |
| POST   | `/tasks`     | Yeni görev ekler           | 201      | 400 (başlık yoksa) |
| GET    | `/tasks`     | Tüm görevleri listeler     | 200      | -                  |
| GET    | `/tasks/:id` | Belirli bir görevi getirir | 200      | 404                |
| PUT    | `/tasks/:id` | Görevi günceller           | 200      | 404                |
| DELETE | `/tasks/:id` | Görevi siler               | 200      | 404                |

## Görev Yapısı

| Alan          | Açıklama                             |
| ------------- | ------------------------------------ |
| `id`          | Sunucu tarafından otomatik verilir   |
| `title`       | Görev başlığı (zorunlu)              |
| `description` | Görev açıklaması                     |
| `priority`    | Öncelik, gönderilmezse `medium` olur |
| `assignee`    | Görevin atandığı kişi                |
| `status`      | Durum, yeni görevde `pending` olur   |
| `createdAt`   | Oluşturulma zamanı (otomatik)        |
| `updatedAt`   | Son güncellenme zamanı (otomatik)    |

## Örnek İstek

Yeni görev eklemek için `POST http://localhost:3000/tasks` adresine, Body kısmında **raw → JSON** seçerek şunu gönderin:

```json
{
  "title": "Login sayfası",
  "description": "Giriş ekranı yapılacak",
  "priority": "high",
  "assignee": "musa"
}
```

Örnek cevap (`201 Created`):

```json
{
  "id": 1,
  "title": "Login sayfası",
  "description": "Giriş ekranı yapılacak",
  "priority": "high",
  "assignee": "musa",
  "status": "pending",
  "createdAt": "2026-11-21T10:00:00.000Z",
  "updatedAt": "2026-11-21T10:00:00.000Z"
}
```

Görevi güncellemek için `PUT http://localhost:3000/tasks/1` adresine sadece değişecek alanları göndermek yeterlidir:

```json
{
  "status": "completed"
}
```

## Logger

Her istek konsola metot, adres ve zaman damgasıyla yazılır:

```
[2026-11-21T10:00:00.000Z] GET /tasks
```

## Klasör Yapısı

```
taskflow/
├── controllers/
│   └── taskController.js   # Görev işlemlerinin mantığı
├── data/
│   └── tasks.json          # Görevlerin saklandığı dosya
├── docs/
│   ├── proje-tanitim.md    # Proje tanıtım dokümanı
│   └── screenshots/        # Postman test ekran görüntüleri
├── middleware/
│   └── logger.js           # İstekleri kaydeden middleware
├── routes/
│   └── taskRoutes.js       # Adreslerin controller'a yönlendirilmesi
├── server.js               # Uygulamanın giriş noktası
└── package.json
```

## Test

Tüm uçlar Postman ile test edilmiştir. Ekran görüntüleri `docs/screenshots` klasöründedir.
