# Portafolio web (GitHub Pages)

Sitio estático: `index.html` + `style.css` + `script.js`, sin framework ni build.
URL final prevista: **https://lovelyx-del.github.io**

## Ya cargado (2026-11-23)

- Los 5 certificados de Cisco (`assets/certs/cisco-*.pdf`) y sus insignias (`assets/certs/insignias/`).
- Streambe Stage 2: `assets/certs/streambe-programacion-ia.png`, **con el DNI tapado**.
- Google: `google-competencias-digitales.pdf` y `google-digital-marketing.pdf` (solo nombre, fecha e ID de finalización).
- GitHub `Lovelyx-del` y los repos `cowcontrol-app` y `StreambeSWA_Cuenca`. LinkedIn.

## Checklist: falta subir

| Archivo o dato | Dónde va | Cómo conseguirlo |
|---|---|---|
| `foto-perfil.jpg` (cuadrada, ~600 px) | `assets/` | Foto propia, fondo liso. Si falta, se ven las iniciales |
| 5 links públicos de Credly (Cisco) | `index.html`, los 5 `href="#" data-pendiente` | credly.com → cada insignia → *Share* → *Copy link*. Poné la URL y borrá `data-pendiente` |
| Repo de LibreMax (opcional) | Tarjeta LibreMax en Proyectos | Solo si se publica el código |

**No subir:** nada con DNI, teléfono, dirección o fecha de nacimiento. Los PDF de Streambe originales (módulos 1-4 y general) tienen el DNI: usar solo la versión tapada.
⚠️ El link de Credly de *IT Customer Support Basics* anotado en `_respaldo_md/trabajos_soporte_redes_resistencia.md` es de **otra persona**: no usarlo.

## Publicar

Ver los pasos en el chat de la sesión o, resumido:

```powershell
cd portafolio_web
git init -b main
git add .
git commit -m "Portafolio inicial"
git remote add origin https://github.com/Lovelyx-del/Lovelyx-del.github.io.git
git push -u origin main
```

Después: GitHub → repo → Settings → Pages → *Deploy from a branch* → `main` / `(root)` → Save.

## Probar en la compu

```powershell
python -m http.server 5507
```

Y abrir `http://localhost:5507` (solo funciona en tu compu: el QR necesita la URL de GitHub Pages).
