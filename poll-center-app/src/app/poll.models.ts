export interface OptionVote{
  option: string;
  vote: number;
}

export interface Poll {
  id: number;
  question: string;
  optionVotes: OptionVote[];
}
