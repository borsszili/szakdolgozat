# Borsos Szilárd (SUUOUU) Szakdolgozat

## Időpont foglaló alkalmazás

---

### Haszált technológiák
- Laravel 11 -> php 8.4
- React (node 10.9)
- Postgres 15
- Redis

### Projekt elindítása:
- A projekt laravel (php 8.4) és react (node 10.9.2) alapú
- Fejlesztéshez dockert használtam [laravel sail](https://laravel.com/docs/11.x/sail) segítségével
- Ha a repository le lett klónozva, akkor a .env.example alapján létre kell hozni a .env filet 
- Az alábbi parancsot kiadva letöltődnek a szükséges függőségek
 ```bash
docker run --rm \
-u "$(id -u):$(id -g)" \
-v "$(pwd):/var/www/html" \
-w /var/www/html \
laravelsail/php84-composer:latest \
composer install --ignore-platform-reqs

./vendor/bin/sail up -d
./vendor/bin/sail npm i
./vendor/bin/sail composer i
./vendor/bin/sail artisan migrate
./vendor/bin/sail npm run dev
```

### Projekt futtatása:
```bash 
  ./vendor/bin/sail up -d
  ./vendor/bin/sail npm run dev
```

### Demo adatok betöltése:
```bash 
  ./vendor/bin/sail artisan db:seed --class=DemoSeeder
```
