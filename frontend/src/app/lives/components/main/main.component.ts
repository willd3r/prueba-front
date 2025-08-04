import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Hls from 'hls.js';
import { LiveService } from './live.service';

declare const window: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, AfterViewInit {
  trustedStreamingUrl: SafeResourceUrl | undefined;
  private streamUrl: string = ''; // Inicialmente vacío, se actualizará con la respuesta del servicio
  private hls: Hls | undefined;

  @ViewChild('videoPlayer') videoPlayer!: ElementRef;

  private language = 'es';

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private liveService: LiveService
  ) { }

  startStreaming() {
    // this.webRTCService.startStreaming();
  }

  addBuy() {
    return this.router.navigate(['buy-prod']);
  }

  addFriend() {
    return Swal.fire('solicitud de amistad enviada', '', 'success');
  }

  ngOnInit(): void {
    // Se solicita la URL de streaming al backend
    this.liveService.getStreamUrl().subscribe({
      next: (response) => {
        // Se utiliza la propiedad "streamingUrl" que retorna el backend
        this.streamUrl = response.streamingUrl;
        this.trustedStreamingUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.streamUrl);
        // Si el reproductor ya se inicializó, se actualiza la fuente
        if (this.hls && this.videoPlayer) {
          this.hls.loadSource(this.streamUrl);
        }
      },
      error: (err) => console.error('Error al obtener la URL de streaming:', err)
    });
  }

  ngAfterViewInit(): void {
    this.initPlayer();
  }

  private initPlayer() {
    const video: HTMLVideoElement = this.videoPlayer.nativeElement;
    if (Hls.isSupported()) {
      this.hls = new Hls();
      if (this.streamUrl) { // Si ya se obtuvo la URL
        this.hls.loadSource(this.streamUrl);
      }
      this.hls.attachMedia(video);
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(err => console.error('Error al reproducir el video:', err));
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = this.streamUrl;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(err => console.error('Error al reproducir el video:', err));
      });
    } else {
      console.error('El navegador no soporta HLS.');
    }
  }
}
