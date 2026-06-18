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
  newPoll = { question: '' };
  optionVotes = signal<{option: string, vote: number}[]>([
    {option: '', vote: 0},
    {option: '', vote: 0}
  ]);
  polls = signal<Poll[]>([]);

  constructor(private pollService: PollService) {}

  ngOnInit(): void {
    this.loadPolls();
  }

  loadPolls() {
    this.pollService.getPolls().subscribe({
      next: (data) => this.polls.set(data),
      error: (error) => console.error('Error fetching polls: ', error)
    });
  }

  addOption() {
    this.optionVotes.update(opts => [...opts, {option: '', vote: 0}]);
  }

  removeOption(index: number) {
    this.optionVotes.update(opts => opts.filter((_, i) => i !== index));
  }

  createPoll() {
    const pollToSend: Poll = {
      question: this.newPoll.question,
      optionVotes: this.optionVotes().filter(o => o.option.trim() !== '')
    };
    this.pollService.createPoll(pollToSend).subscribe({
      next: (createdPoll) => {
        this.polls.update(current => [...current, createdPoll]);
        this.newPoll.question = '';
        this.optionVotes.set([{option: '', vote: 0}, {option: '', vote: 0}]);
      },
      error: (error) => console.error('Error creating poll: ', error)
    });
  }

  vote(pollId: number | undefined, optionIndex: number) {
    if (pollId === undefined) return;
    this.pollService.vote(pollId, optionIndex).subscribe({
      next: () => {
        this.polls.update(polls =>
          polls.map(poll =>
            poll.id === pollId
              ? {
                ...poll,
                optionVotes: poll.optionVotes.map((opt, i) =>
                  i === optionIndex ? {...opt, vote: opt.vote + 1} : opt
                )
              }
              : poll
          )
        );
      },
      error: (error) => console.error('Error voting: ', error)
    });
  }

  getTotalVotes(poll: Poll): number {
    return poll.optionVotes.reduce((sum, o) => sum + o.vote, 0);
  }

  getPercent(poll: Poll, votes: number): number {
    const total = this.getTotalVotes(poll);
    if (total === 0) return 0;
    return Math.round((votes / total) * 100);
  }

  trackByIndex(index: number): number {
    return index;
  }
}
