package org.nira.pollcenter;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PollService {

    private final PollRepo pollRepo;

    public Poll createPoll(Poll poll) {
        return pollRepo.save(poll);
    }

    public List<Poll> getPolls() {
        return pollRepo.findAll();
    }

    public Optional<Poll> getPoll(Long id) {
        return pollRepo.findById(id);
    }

    public void vote(Long pollId, int optionIndex) {
        Poll poll = pollRepo.findById(pollId).orElseThrow(() -> new RuntimeException("Poll not found"));
        List<OptionVote> optionVotes = poll.getOptionVotes();
        if (optionIndex < 0 || optionIndex >= optionVotes.size()) {
            throw new IllegalArgumentException("Option index out of bounds");
        }
        OptionVote optionVote = optionVotes.get(optionIndex);
        optionVote.setVote(optionVote.getVote() + 1);
        pollRepo.save(poll);
    }
}
