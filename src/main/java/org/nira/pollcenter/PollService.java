package org.nira.pollcenter;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PollService {

    private final PollRepo pollRepo;

    public Poll createPoll(Poll poll) {
        return pollRepo.save(poll);
    }
}
