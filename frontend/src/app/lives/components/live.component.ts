import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { LiveService } from './main/live.service';
import Hls from 'hls.js';

@Component({
  selector: 'app-live',
  templateUrl: './main/main.component.html',
  styleUrls: ['./main/main.component.scss']
})
export class LiveComponent implements AfterViewInit {
  @ViewChild('videoPlayer', { static: true }) videoRef!: ElementRef<HTMLVideoElement>;

  constructor(private liveService: LiveService) {}

  ngAfterViewInit(): void {
    this.startStreaming();
  }

  startStreaming(): void {
    this.liveService.getStreamUrl().subscribe({
      next: ({ streamingUrl }) => {
        const video = this.videoRef.nativeElement;
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(streamingUrl);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play();
          });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = streamingUrl;
          video.addEventListener('loadedmetadata', () => {
            video.play();
          });
        }
      },
      error: (err) => {
        console.error('Error al cargar el stream:', err);
      }
    });
  }

    addBuy(): void {
      // Aquí puedes agregar la lógica para la función addbuy
    }
  }
