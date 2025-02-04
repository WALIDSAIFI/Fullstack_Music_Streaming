# 🎵 Projet Streaming Musical Fullstack

## 📌 Contexte du projet
Suite aux développements séparés d'une API REST Spring Boot et d'une application frontend Angular lors des deux briefs précédents (Brief2 Sprint4 et Brief2 Sprint5), l'objectif est maintenant de fusionner ces deux projets en une application fullstack complète et cohérente.

Cette intégration permettra de créer une application de streaming musical entièrement fonctionnelle en combinant :
- 🎧 **Backend (Spring Boot)** : Gestion du catalogue musical, stockage des fichiers audio et authentification.
- 🎨 **Frontend (Angular)** : Interface moderne pour écouter et organiser la musique.

---

## 🏗️ Entités Principales

- **📀 Album** : `titre (String)`, `artiste (String)`, `annee (Integer)`
- **🎵 Chanson** : `titre (String)`, `duree (Integer)`, `trackNumber (Integer)`, `description (String, max 200 caractères)`, `catégorie (String)`, `date d'ajout (Date)`, `audioFileId (String)`
- **👤 User** : `login (String)`, `password (String)`, `active (Boolean)`, `roles (Collection de Role)`
- **🔑 Role** : `name (String)`

Un album peut contenir plusieurs chansons, et chaque chanson appartient à un seul album.

---

## 🚀 Fonctionnalités Requises

### 🎧 Backend (Spring Boot)

#### 📀 Gestion des Albums
- 🔍 Lister et rechercher les albums (pagination et tri) 
- 🎼 Filtrer par artiste et année
- ✏️ Ajouter, modifier et supprimer des albums *(ADMIN uniquement)*

#### 🎵 Gestion des Chansons
- 🔍 Lister et rechercher les chansons
- 📁 Ajouter et gérer les fichiers audio *(ADMIN uniquement)*
- ✏️ Modifier et supprimer les chansons *(ADMIN uniquement)*

#### 👤 Gestion des Utilisateurs
- 🔑 Authentification (`/api/auth/login`)
- 📝 Inscription (`POST /api/auth/register`)
- 👥 Gestion des utilisateurs et rôles *(ADMIN uniquement)*

#### 🎶 Gestion des fichiers audio
- 📂 Upload limité à **15MB** (Formats : MP3, WAV, OGG)
- 🔒 Stockage sécurisé via **GridFS** (MongoDB)

---

### 🎨 Frontend (Angular 17)

#### 🎵 Gestion des Tracks
- ✅ **CRUD** complet avec **NgRx**
- 🎼 **Gestion des métadonnées** (nom, artiste, description, durée, catégorie)
- 📂 **Upload des fichiers audio**
- 🔍 **Système de recherche et filtrage**

#### 🎛️ Lecteur audio intégré
- ▶️ **Play/Pause/Next/Previous**
- 🔊 **Contrôle du volume et de la progression**
- 🎚️ **Gestion des états avec NgRx**

#### 🖥️ Interface Utilisateur
- 🔑 Page **Login/Register**
- 📚 Page **Bibliothèque (Albums)**
- 🎼 Page **Détail d'un album**
- 🔎 **Barre de recherche et filtres**
- 🎶 **Lecteur audio intégré**

---

## 🛠️ Technologies Utilisées

### Backend 🎧
- 🌱 **Spring Boot**
- 🔐 **Spring Security + JWT**
- 🗄️ **MongoDB + GridFS**
- 🎯 **REST API**
- ✅ **Tests : JUnit, Mockito**
- 🐳 **Docker + Jenkins**

### Frontend 🎨
- 🅰️ **Angular 17**
- 🔄 **NgRx** (Gestion d'état)
- ⚡ **RxJS + TypeScript**
- 🎨 **Bootstrap/Tailwind**

---

## ✅ Exigences Techniques

### 🎧 Backend
- 🎭 **Profils (dev, prod)**
- ✅ **Tests unitaires**
- ⚠️ **Gestion des exceptions**
- 📜 **Système de logging**
- 🔄 **Gestion des transactions**

### 🎨 Frontend
- 🏗️ **Architecture modulaire & Lazy Loading**
- ✅ **Tests unitaires**
- 🔐 **Guards pour la sécurité**
- 🚀 **Resolvers pour précharger les données**
- 🛠️ **Intercepteurs HTTP**

---

## 📌 Installation et Lancement

### 🚀 Backend (Spring Boot)
```bash
# Cloner le dépôt
git clone https://github.com/WALIDSAIFI/Fullstack_Music_Streaming
cd Fullstack_Music_Streaming

# Construire et exécuter l'application
mvn clean install
mvn spring-boot:run
```

### 🎨 Frontend (Angular)
```bash
cd projet-streaming/frontend
npm install
ng serve
```

---
