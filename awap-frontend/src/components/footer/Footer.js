import React from 'react'
import './Footer.css'

// the links need to be changed to take the user to the correct page, will do this in a later push

export default function () {
  return (
    <footer className="footer">
        <div className="container">
            <div className="row">
                <div className="footer-col">
                    <h4>Theatre Showtimes</h4>
                    <ul>
                        <li><a href="">Finnkino Vaasa</a></li>
                        <li><a href="">Finnkino Helsinki</a></li>
                        <li><a href="">Finnkino Oulu</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Movie Genres</h4>
                    <ul>
                        <li><a href="">Horror</a></li>
                        <li><a href="">Action</a></li>
                        <li><a href="">Comedy</a></li>
                        <li><a href="">Romance</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Community</h4>
                    <ul>
                        <li><a href="">About Us</a></li>
                        <li><a href="">Groups</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Follow Us</h4>
                    <div className="social-links">
                        <a href="#">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
}
