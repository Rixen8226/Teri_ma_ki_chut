* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Poppins', sans-serif;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('background.png'); /* Your blurred background */
    background-size: cover;
    background-position: center;
    backdrop-filter: blur(10px);
}

.card-container {
    background-color: rgba(255, 255, 255, 0.2);
    padding: 5px;
    border-radius: 20px;
    backdrop-filter: blur(10px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.card {
    background: linear-gradient(135deg, #ffffff, #f3f3f3);
    padding: 30px;
    border-radius: 20px;
    text-align: center;
    max-width: 310px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.profile-pic {
    position: relative;
}

.profile-pic img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 4px solid #ffffff;
    box-shadow: 0 5px 15px rgb(0, 255, 0, 0.2);
}


.verified-badge {
    position: absolute;
    bottom: -5px;
    right: 5px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 4px solid #ffffff;
    box-shadow: 0 5px 15px rgb(0, 255, 0, 0.2);
}

h2 {
    margin: 20px 0 10px;
    font-size: 24px;
    font-weight: 600;
    color: #333;
}

.role {
    font-size: 16px;
    color: #777;
    margin-bottom: 15px;
}

.about {
    font-size: 14px;
    color: #555;
    margin-bottom: 20px;
    line-height: 1.6;
}

.social-links a img {
    width: 30px;
    margin: 0 8px;
}

.join-btn {
    display: inline-block;
    background-color: #00ff00;
    color: white;
    padding: 12px 30px;
    border-radius: 25px;
    text-decoration: none;
    font-size: 16px;
    margin-top: 20px;
    box-shadow: 0 5px 15px rgb(0, 255, 0, 0.3);
    transition: background-color 0.3s ease;
}

.join-btn:hover {
    background-color: #00ff00;
  }
