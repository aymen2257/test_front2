import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
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
  public nearestAgency: any; // Property to store the nearest agency

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

  private updateMap(): void {
    this.agencies.forEach(agence => {
      this.geocodeAddress(agence.address).subscribe(coords => {
        if (coords && typeof coords.lat !== 'undefined' && typeof coords.lon !== 'undefined') {
          const marker = this.L.marker([coords.lat, coords.lon])
            .bindPopup(`<b>${agence.name}</b><br>${agence.address}`);
          marker.addTo(this.map);
        } else {
          console.error(`Failed to add marker for agency "${agence.name}" due to invalid coordinates.`);
        }
      });
    });
  }

  findNearestAgency(): void {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      console.log(lat);
      console.log(lon);
      console.log(position);
      this.agenceService.getNearestAgence(lat, lon).subscribe(agency => {
        this.nearestAgency = agency;
        if (agency) {
          this.L.marker([agency.latitude, agency.longitude])
            .bindPopup(`<b>${agency.name}</b><br>${agency.address}`)
            .addTo(this.map)
            .openPopup();
          this.map.setView([agency.latitude, agency.longitude], 14);
        }
      }, error => {
        console.error('Error fetching nearest agency:', error);
        alert('Failed to fetch the nearest agency. Please check your network connection and try again.');
      });
    }, error => {
      console.error('Geolocation not supported or permission denied:', error);
      alert('Geolocation is not supported by your device or the permission was denied.');
    });
  }

  private geocodeAddress(address: string): Observable<any> {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1`;
    const headers = new HttpHeaders({
        'User-Agent': 'MyWebApplication/<App-Version>'
    });

    return this.http.get<any[]>(url, { headers }).pipe(
        retry(3),
        map((response: any[]) => {
            if (response.length > 0 && response[0].lat && response[0].lon) {
              console.log(response[0].lat);
              console.log(response[0].lon);
                return { lat: response[0].lat, lon: response[0].lon };
               
            } else {
                console.error(`Geocoding failed or returned no results for address "${address}".`);
                return undefined;
            }
        }),
        catchError(error => {
            console.error(`Geocoding error for address "${address}":`, error);
            return of(undefined);
        })
    );
  }
}
