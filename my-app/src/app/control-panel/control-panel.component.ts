import { Component, OnInit } from '@angular/core';

export interface ITrack {
  name: string;
  seconds: number;
  currentSecond: number;
}

export interface IMP3Player {
  tracks: Array<ITrack>;
  currentTrack: ITrack;
  currentBpm: number;
  play(): void;
  stop(): void;
  setBpm(bpm: number): void;
  getBpm(): number;
  increaseBpm(): void;
  decreaseBpm(): void;
  nextTrack(): void;
  prevTrack(): void;
}

export class MP3Player implements IMP3Player {
  tracks: ITrack[];
  currentTrack: ITrack;
  currentBpm: number = 60;
  inProgress: any;

  constructor(tracks: ITrack[]) {
    this.tracks = tracks;
    this.currentTrack = tracks.find((_, idx: number) => idx === 0);
  }

  startPlaying = () => {
    if (this.currentTrack.currentSecond < this.currentTrack.seconds) {
      this.currentTrack.currentSecond += 1;
      console.log("Song in second", this.currentTrack.currentSecond);
      this.play();
    } else {
      console.log("Song has finished!");
    }
  };

  play(): void {
    this.inProgress = setTimeout(this.startPlaying, (60/this.currentBpm) * 1000);
  }
  stop(): void {
    this.currentTrack.currentSecond = 0;
    clearTimeout(this.inProgress);
    console.log("Song has been stoped!");
  }
  setBpm(bpm: number): void {
    this.currentBpm = bpm;
  }
  getBpm(): number {
    return this.currentBpm;
  }
  increaseBpm(): void {
    this.setBpm(this.getBpm() + 1);
  }
  decreaseBpm(): void {
    if (this.getBpm()) {
      this.setBpm(this.getBpm() - 1);
    }
  }
  nextTrack(): void {
    this.stop();
    const numberOfTracks = this.tracks.length;
    const nextIdxTrack = (this.tracks.indexOf(this.currentTrack) + 1) % numberOfTracks;
    this.currentTrack = this.tracks.find((_, idx) => idx === nextIdxTrack);
  }
  prevTrack(): void {
    this.stop();
    const numberOfTracks = this.tracks.length;
    const index = this.tracks.indexOf(this.currentTrack) || numberOfTracks || numberOfTracks - 1;
    const prevIdxTrack = index - 1 % numberOfTracks;
    this.currentTrack = this.tracks.find((_, idx) => idx === prevIdxTrack);
  }
}

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {
  mp3Player: IMP3Player;

  constructor() {
    const songs: Array<ITrack> = [{
      name: "Rockabye",
      currentSecond: 0,
      seconds: 120
    }, {
      name: "Sweet Dreams",
      currentSecond: 0,
      seconds: 120
    }, {
      name: "Where is my mind",
      currentSecond: 0,
      seconds: 120
    }];

    this.mp3Player = new MP3Player(songs);
  }

  ngOnInit() {}

}
