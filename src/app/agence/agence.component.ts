import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AgenceService } from '../_services/agence.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-unique-agence',
  templateUrl: './agence.component.html',
  styleUrls: ['./agence.component.css']
})
export class AgenceComponent implements AfterViewInit, OnInit {
  private map: any;
  private L: any; // Store Leaflet globally within the component
  public isBrowser: boolean;
  public governorates: string[] = [];
  public selectedGovernorate!: string;
  public agencies: any[] = [];

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private agenceService: AgenceService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.agenceService.getGovernorates().subscribe(data => {
        this.governorates = data;
      });

      import('leaflet').then(L => {
        this.L = L;
        this.initMap();
      });
    }
  }

  private initMap(): void {
    this.map = this.L.map('map').setView([36.8008, 10.1807], 8);
    this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  ngAfterViewInit(): void {
    // Initialization that requires DOM elements should ideally go here
  }

  onGovernorateChange(): void {
    this.agenceService.getAgencesByGovernorate(this.selectedGovernorate).subscribe(agencies => {
      this.agencies = agencies;
      this.updateMap();
    });
  }

  private geocodeAddress(address: string): Observable<any> {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1`;
    const headers = new HttpHeaders({
        'User-Agent': 'MyWebApplication/<>'
    });

    return this.http.get<any[]>(url, { headers }).pipe(
        map((response: any[]) => {
         
                console.log(`Geocoding success for address "${address}":`, response[0]);
                return { lat: response[0].lat, lon: response[0].lon };
             
        }),
        catchError(error => {
            console.error(`Geocoding error for address "${address}":`, error);
            return of(undefined); // Returning undefined to handle it gracefully in the subscriber
        })
    );
}



private updateMap(): void {
  if (this.isBrowser && this.map) {
    this.agencies.forEach(agence => {
      this.geocodeAddress(agence.address).subscribe(coords => {
        if (coords && coords.lat !== undefined && coords.lon !== undefined) { // Ensure both lat and lon are defined
          const marker = this.L.marker([coords.lat, coords.lon])
            .bindPopup(`<b>${agence.name}</b><br>${agence.address}`);
          marker.addTo(this.map);
        } else {
          console.error(`Failed to add marker for agency "${agence.name}" due to invalid coordinates: Latitude and Longitude are undefined.`);
          // Optionally, provide feedback to the user or log this information
        }
      });
    });
  }
}



}
