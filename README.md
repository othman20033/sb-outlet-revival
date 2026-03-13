# SB Outlet Revival - E-commerce Premium Vintage 👕✨

Une solution e-commerce moderne et performante conçue pour la revente de vêtements vintage haut de gamme. Ce projet met l'accent sur la rapidité, l'expérience mobile-first et l'optimisation des conversions.

## 🚀 Fonctionnalités
- ✨ **Design Premium Vintage** : Une esthétique soignée avec des animations fluides.
- 📱 **Mobile-First** : Optimisé pour une navigation fluide sur smartphone.
- 🛍️ **Système de "Drops"** : Gestion des lancements de produits exclusifs.
- 💳 **Paiement Cash on Delivery (COD)** : Adapté pour le marché marocain.
- 📦 **Suivi de Commande** : Interface client pour suivre l'état de livraison.
- 🛠️ **Dashboard Admin** : Gestion complète des produits, catégories et commandes.

## 🛠️ Stack Technique
- **Frontend** : React (Vite), TypeScript, Tailwind CSS, shadcn/ui, Framer Motion.
- **Backend** : Laravel 12 (PHP 8.2+).
- **Base de données** : MySQL.

## 📦 Installation et Configuration

### 1. Cloner le projet
```bash
git clone https://github.com/othman20033/sb-outlet-revival.git
cd sb-outlet-revival
```

### 2. Configuration du Frontend
```bash
cd frontend

# Installer les dépendances
npm install

# Créer le fichier .env (Copier .env.example si disponible)
cp .env.example .env

# Lancer le serveur de développement
npm run dev
```

### 3. Configuration du Backend (Laravel)
```bash
cd backend

# Installer les dépendances PHP
composer install

# Configurer l'environnement
cp .env.example .env
php artisan key:generate

# Lancer les migrations
php artisan migrate

# Lancer le serveur backend
php artisan serve
```

## 🧪 Tests
Pour tester le projet localement :
1. Assurez-vous d'avoir configuré l'URL de l'API dans le fichier `frontend/.env`.
2. Lancez le serveur frontend (`cd frontend && npm run dev`).
3. Lancez le serveur backend (`cd backend && php artisan serve`).
4. Accédez à l'URL locale.

---
Développé avec ❤️ par [othman20033](https://github.com/othman20033)
