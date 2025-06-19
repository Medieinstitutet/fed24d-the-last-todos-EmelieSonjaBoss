# Todo App


En  todo-app byggd med React, TypeScript och Vite. Appen är utvecklad som en Progressive Web App (PWA) vilket betyder att den kan installeras och användas offline.

## Funktioner

-  Skapa, redigera och ta bort todos
-  Markera todos som klara/oklara
-  Filtrera mellan aktiva och avklarade todos
-  Sortera todos med upp/ner-pilar
-  Automatisk sparning i localStorage
-  Fungerar offline (PWA)

## Teknisk Stack

- React 19
- TypeScript
- Vite
- Sass
- LocalStorage
- Service Workers för PWA-funktionalitet

## Installation

1. Klona repot:
```bash
git clone https://github.com/EmelieSonjaBoss/fed24d-the-last-todos-EmelieSonjaBoss.git
```

2. Installera beroenden:
```bash
npm install --legacy-peer-deps
```

3. Starta utvecklingsservern:
```bash
npm run dev
```


## Live Demo

Besök och ladda ner appen på: [https://emeliesonjaboss.github.io/fed24d-the-last-todos-EmelieSonjaBoss](https://emeliesonjaboss.github.io/fed24d-the-last-todos-EmelieSonjaBoss)

![Download help](src/assets/images/download.jpg)


## Projektstruktur

```
src/
  ├── components/        # React-komponenter
  │   ├── TodoList.tsx  # Huvudkomponent för todo-listan
  │   ├── TodoItem.tsx  # Komponent för enskilda todos
  │   └── TodoForm.tsx  # Formulär för att skapa nya todos
  └── styles/           # Sass-filer för varje komponent och globala variabler/mixins
```

## Syskon-app
Kolla in packlistan på https://emeliesonjaboss.github.io/packing-list/

## Skapad av

Emelie Boss
