import {Component, OnInit, signal} from '@angular/core';
import {PollService} from '../poll.service';
import {Poll} from '../poll.models';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-poll',
  imports: [CommonModule, FormsModule],
  templateUrl: './poll.html',
  styleUrl: './poll.css',
})
export class PollComponent implements OnInit {
  newPoll: Poll = {
    question: '',
    optionVotes: [
      {option: '', vote: 0},
      {option: '', vote: 0}
    ]
  };
  polls = signal<Poll[]>([]);

  constructor(private pollService: PollService) {}

  ngOnInit(): void {
    this.loadPolls();
  }

  loadPolls() {
    this.pollService.getPolls().subscribe({
      next: (data) => {
        this.polls.set(data);
      },
      error: (error) => {
        console.error("Error fetching polls: ", error);
      }
    });
  }

  createPoll() {
    const pollToSend: Poll = {
      ...this.newPoll,
      optionVotes: this.newPoll.optionVotes.filter(o => o.option.trim() !== '')
    };

    this.pollService.createPoll(pollToSend).subscribe({
      next: (createdPoll) => {
        this.polls.update(current => [...current, createdPoll]);
        this.newPoll = {
          question: '',
          optionVotes: [
            {option: '', vote: 0},
            {option: '', vote: 0}
          ]
        };
      },
      error: (error) => {
        console.error("Error creating poll: ", error);
      }
    });
  }

  trackByIndex(index: number): number {
    return index;
  }
}
