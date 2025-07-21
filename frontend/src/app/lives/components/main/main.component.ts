import { Component, OnInit } from '@angular/core';
// import { WebrtcService } from 'src/app/services/webrtc.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import Player from '@vimeo/player';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

declare const window: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  trustedStreamingUrl: SafeResourceUrl | undefined;
  constructor(private router: Router, private sanitizer: DomSanitizer) {
    const streamUrl = 'https://tudominio.cloudfront.net/live/stream.m3u8'; // Ejemplo aca va la url del streaming williams
    this.trustedStreamingUrl = this.sanitizer.bypassSecurityTrustResourceUrl(streamUrl);
  }

  private language = 'es';
  private player: any;

  localVideo = document.getElementById('intro_explanimation') as HTMLVideoElement;

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
    this.initPlayer();
  }

  private initPlayer() {
    this.player = new Player(this.localVideo, {
      id: 231377016,
    });
    this.player
      .enableTextTrack(this.language, 'subtitles')
      .then((track: any) => {
        // track.language = the iso code for the language
        // track.kind = 'captions' or 'subtitles'
        //this.language = track.language;

        // track.label = the human-readable label
        console.log(track);
      })
      .catch((error: { name: any }) => {
        console.log(error);
        switch (error.name) {
          case 'InvalidTrackLanguageError':
            console.log(error.name);
            // no track was available with the specified language
            break;
          case 'InvalidTrackError':
            // no track was available with the specified language and kind
            break;
          default:
            // some other error occurred
            break;
        }
      });
  }
}
