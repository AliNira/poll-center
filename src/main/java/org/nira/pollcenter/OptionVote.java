package org.nira.pollcenter;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Embeddable
public class OptionVote {
    @Column(name = "option_text")
    private String option;
    @Column(name = "vote_count")
    private Long vote = 0L;
}
