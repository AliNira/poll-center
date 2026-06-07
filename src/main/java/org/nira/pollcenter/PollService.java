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
}
