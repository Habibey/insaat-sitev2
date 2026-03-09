# 🏛️ Civil Engineering Academic Portfolio & 3D Geodesic Dome Modeler

A modern, full-stack web application built for a Civil Engineering academic research group. This platform serves as both an academic portfolio and a high-precision computational tool, featuring a real-time **3D Geodesic Dome Modeling Engine**.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Django](https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white)
![Plotly](https://img.shields.io/badge/Plotly-%233F4F75.svg?style=for-the-badge&logo=plotly&logoColor=white)
![NumPy](https://img.shields.io/badge/numpy-%23013243.svg?style=for-the-badge&logo=numpy&logoColor=white)

## ✨ Features

* **Advanced 3D Geodesic Engine:** Calculates and renders complex geodesic dome geometries (Icosahedron, Octahedron, etc.) based on user-defined span, height, and frequency parameters.
* **Interactive Visualization:** Utilizes `Plotly.js` for rendering highly interactive 3D meshes with fixed aspect ratios, categorized group coloring, and node/member toggles.
* **Computational Backend:** Powered by Python and `NumPy` to perform heavy matrix operations, node coordinate calculations, and member length groupings instantly.
* **Multi-language Support (i18n):** Fully localized in English and Turkish (TR/EN) using `react-i18next` for global academic reach.
* **Modern UI/UX:** Responsive, animation-rich, and clean interface designed for engineering professionals and students.

## 🛠️ Tech Stack

**Frontend:**
* React (Vite)
* Plotly.js (3D Data Visualization)
* Axios (API Integration)
* React Router DOM
* i18next (Internationalization)

**Backend:**
* Python 3
* Django & Django REST Framework (DRF)
* NumPy (Mathematical Matrix Calculations)

## 🚀 Installation & Setup

To run this project locally, you will need to start both the backend and frontend servers.

### 1. Backend Setup (Django)
```bash
# Clone the repository
git clone [https://github.com/Habibey/insaat-sitev2.git]
cd insaat-sitev2/backend

# Create a virtual environment and activate it
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate

# Install required dependencies
pip install django djangorestframework django-cors-headers numpy

# Run migrations and start the server
python manage.py migrate
python manage.py runserver



# Open a new terminal and navigate to the frontend folder
cd insaat-sitev2/frontend

# Install node modules
npm install

# Start the Vite development server
npm run dev
