# Eco – Sustainable Waste Management System

Eco is a full-stack web application designed to promote sustainable waste management by enabling users to report, track, and manage waste efficiently within a community. The system connects citizens and waste management authorities through a simple and transparent platform.

---

## Features

- Report waste issues with relevant details  
- Dashboard to track reported waste  
- Update and monitor report status  
- Admin controls for managing reports  
- Responsive and user-friendly interface  

---

## Tech Stack

### Frontend
- HTML  
- CSS  
- JavaScript  

### Backend
- PHP  
- Laravel (Blade templates)  

### Database
- MySQL / SQLite  

---

## Project Structure

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/unnatig17/eco.git
cd eco
```

### 2. Backend Setup

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

## Usage

1. Open the application in your browser at:
    " http://localhost:8000 "
2. Register or log in as a user  
3. Submit a waste report with relevant details  
4. View submitted reports on the dashboard  
5. Admin users can review, update, and manage report status  

---

## Future Enhancements

- Image upload support for waste reports  
- Notification system for status updates  
- Role-based authentication (User / Admin)  
- Analytics and charts for waste trends  
- Location-based waste reporting  

---

## Contributing

Contributions are welcome.

1. Fork the repository  
2. Create a new branch (`feature/your-feature`)  
3. Commit your changes  
4. Open a pull request  

---

## License

This project is licensed under the MIT License.

---

## Author

Unnati Gupta  
GitHub: https://github.com/unnatig17
