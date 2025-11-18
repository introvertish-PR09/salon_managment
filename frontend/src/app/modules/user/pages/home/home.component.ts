import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
   services = [
    {
      name: 'Hair Styling',
      duration: '45 mins',
      price: 500,
      image: 'https://i.ibb.co/nrMY6zB/haircut.jpg',
    },
    {
      name: 'Facial & Skin Care',
      duration: '60 mins',
      price: 800,
      image: 'https://i.ibb.co/x7Nvg1G/facial.jpg',
    },
    {
      name: 'Spa & Relaxation',
      duration: '90 mins',
      price: 1200,
      image: 'https://i.ibb.co/tXwXsyX/spa.jpg',
    },
  ];
}
