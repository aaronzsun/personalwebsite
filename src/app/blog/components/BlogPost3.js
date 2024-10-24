"use client"

import { useState } from 'react';
import { Box, Typography, Collapse, Link } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const BlogPost3 = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle expanded state
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box sx={{ marginBottom: 4 }}>
      {/* Blog Post Title with Clickable Arrow and Text */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={toggleExpand}
      >
        {/* ArrowRightIcon rotates when expanded */}
        <ArrowRightIcon
          sx={{
            color: '#36ffe7',
            marginRight: '8px',
            transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',  // Rotate the icon
            transition: 'transform 0.3s ease',  // Smooth transition for rotation
          }}
        />
        {/* Blog Post Title */}
        <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.2rem', md: '1.2rem' }, color: 'white' }}>
          <Typography variant="h6" component="span" sx={{ fontSize: { xs: '1rem', sm: '1.2rem', md: '1.2rem' }, fontFamily: 'var(--font-iosevka), monospace', color: '#36ffe7', mr: 1 }}>2024 Sep 18:</Typography>
            Cool Pairwise Comparison Sorting with LLMs
        </Typography>
      </Box>

      {/* Blog Post Content that expands and collapses */}
      <Collapse in={isExpanded}>
        <Box sx={{ marginTop: 2, paddingLeft: '32px' }}>  {/* Align with title */}
          <Typography variant="body1" sx={{ color: '#afafaf' }}>
            I&apos;ll admit it: the AI hype might be real. With the release of ChatGPT and now model 4o, every product, company, 
            and developer is looking to utilize AI in their applications. Recently, I&apos;ve been working with OpenAI&apos;s API to implement the power of
            LLMs (large language models) into my projects. One particularly interesting use case I&apos;ve been looking to tackle is using OpenAI&apos;s 
            LLM for sorting algorithms with only pairwise comparisons. Typically, we sort things by some value (e.g. [1, 2, 3, 4])- but sometimes thats
            just not possible for certain tasks. Imagine scenarios like these:
            <Box sx={{ display: 'flex', alignItems: 'flex-start', color: '#afafaf', mt: 2 }}>
                <ArrowRightIcon
                    sx={{
                    color: '#36ffe7',
                    marginRight: '6px',
                    }}
                />
                <Box>
                    <Typography
                    variant="body1"
                    component="span"
                    sx={{ fontFamily: 'var(--font-iosevka), monospace', color: '#36ffe7', marginRight: 1 }}
                    >
                    We have a portfolio of essays about a topic and we want to sort them by how well they are written and/or by
                    their argument&apos;s robustness.
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', color: '#afafaf', mt: 2, mb: 2 }}>
                <ArrowRightIcon
                    sx={{
                    color: '#36ffe7',
                    marginRight: '6px',
                    }}
                />
                <Box>
                    <Typography
                    variant="body1"
                    component="span"
                    sx={{ fontFamily: 'var(--font-iosevka), monospace', color: '#36ffe7', marginRight: 1 }}
                    >
                    We have a set of tweets on X that we want to sort by some sort by sentiment: anger, passion, relation to a topic, etc.
                    </Typography>
                    <Typography
                    variant="body1"
                    component="span"
                    sx={{ display: 'inline', color: '#afafaf' }}
                    >
                    
                    </Typography>
                </Box>
            </Box>    
            Sure, we could implement an algorithm to identify some key features of each essay or tweet to develop some arbitrary score, but that&apos;s extremely 
            difficult without building a powerful natural language processor in addition to an LLM that can identify things such as fluency or sentiment. Plus, if
            the strength of the sort is important, we&apos;d have to fine tune our LLM or algorithm to ensure the scores given are accurate by ranking and that would 
            likely require immense amounts of both training data and learning with human feedback (and probably wouldn&apos;t guarentee a strong sort either way). With 10
            tweets or essays, it might be possible with enough work. But imagine we had 100000 or 1000000- our scoring algorithm would have to be really, REALLY good
            and really, REALLY precise to provide scores that accurately reflecting rankings, in that if item A has score A and item B has score B and A &gt; B, 
            then item A must be better than item B on whatever were looking to rank them on. <br/><br/>

            The solution is to sort using pairwise comparisons. We can compare two essays or two tweets with each other and use an LLM to determine which is more 
            &quot;angry&quot; or which thesis uses better evidence. When we compare these two items, we don&apos;t get anything like a score or ranking: all we know
            is which is better than the other in regards to some query we ask the LLM to evaluate it on. The difficult part of this is using these comparisons to sort
            through a lot of different things, since a simple comparison between two items doesn&apos;t tell us anything about the rest of the items, or even anything about how
            the two items we compared relate to the rest of the data. However, one idea we can take advantage of when it comes to sorting is that we usually only
            care about getting some subset of rankings near the top. If we had 100000 essays, we probably wouldn&apos;t care about getting an ordered ranking of all
            100000. Rather, we&apos;d probably care more about getting the top 100 or 1000. <br/><br/>
            This is where we can use a super awesome sorting algorithm called <Link
                href="https://www.baeldung.com/cs/tournament-sort-algorithm"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                color: '#36ffe7',
                textDecoration: 'none',
                '&:hover': {
                    textDecoration: 'underline', 
                },
                }}
            >
                tournament sort.
            </Link> Tournament sort works best when we want to get the top K items from a large dataset
            in strongly sorted order while using only pairwise comparisons. As an example, if we had 100000 tweets, and we wanted to get the 100 angriest tweets from this
            in strongly sorted order, tournament sort would be our go-to method. Here&apos;s how the algorithm works, using angriest tweets scenario as an example:
            <Box sx={{ display: 'flex', alignItems: 'flex-start', color: '#afafaf', mt: 2 }}>
                <ArrowRightIcon
                    sx={{
                    color: '#36ffe7',
                    marginRight: '6px',
                    }}
                />
                <Box>
                    <Typography
                    variant="body1"
                    component="span"
                    sx={{ fontFamily: 'var(--font-iosevka), monospace', color: '#36ffe7', marginRight: 1 }}
                    >
                    Exactly as the name indicates, were going to hold a tournament between all of our tweets (think March Madness, a single elimination bracket).
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', color: '#afafaf', mt: 2, mb: 2 }}>
                <ArrowRightIcon
                    sx={{
                    color: '#36ffe7',
                    marginRight: '6px',
                    }}
                />
                <Box>
                    <Typography
                    variant="body1"
                    component="span"
                    sx={{ fontFamily: 'var(--font-iosevka), monospace', color: '#36ffe7', marginRight: 1 }}
                    >
                    Pairing up each of our 100000 tweets, we pass pairs of tweets to our LLM and ask it to determine which one is angrier (if the number of tweets
                    in a round is odd, we can just give one tweet a bye to the next round). The angrier tweet moves onto the next round.
                    </Typography>
                </Box>
            </Box>  
            <Box sx={{ display: 'flex', alignItems: 'flex-start', color: '#afafaf', mt: 2, mb: 2 }}>
                <ArrowRightIcon
                    sx={{
                    color: '#36ffe7',
                    marginRight: '6px',
                    }}
                />
                <Box>
                    <Typography
                    variant="body1"
                    component="span"
                    sx={{ fontFamily: 'var(--font-iosevka), monospace', color: '#36ffe7', marginRight: 1 }}
                    >
                    Just like in any bracket tournament, were going to have one winner in the end. This tweet is guarenteed to be the angriest of the whole set. 
                    We can store it somewhere like in a list. For now, let&apos;s call this winner tweet A.
                    </Typography>
                </Box>
            </Box>  
            <Box sx={{ display: 'flex', alignItems: 'flex-start', color: '#afafaf', mt: 2, mb: 2 }}>
                <ArrowRightIcon
                    sx={{
                    color: '#36ffe7',
                    marginRight: '6px',
                    }}
                />
                <Box>
                    <Typography
                    variant="body1"
                    component="span"
                    sx={{ fontFamily: 'var(--font-iosevka), monospace', color: '#36ffe7', marginRight: 1 }}
                    >
                    Here&apos;s where the power of tournament sort starts to show. Let&apos;s think about the second angriest tweet. At some point in the tournament,
                    the second angriest tweet MUST have lost to our winning tweet A. No other tweet besides A would be angrier, so it would beat every other tweet besides
                    the winner.
                    </Typography>
                </Box>
            </Box>  
            <Box sx={{ display: 'flex', alignItems: 'flex-start', color: '#afafaf', mt: 2, mb: 2 }}>
                <ArrowRightIcon
                    sx={{
                    color: '#36ffe7',
                    marginRight: '6px',
                    }}
                />
                <Box>
                    <Typography
                    variant="body1"
                    component="span"
                    sx={{ fontFamily: 'var(--font-iosevka), monospace', color: '#36ffe7', marginRight: 1 }}
                    >
                    That means if we run another tournament between all the tweets that lost to tweet A, our second angriest tweet has to be in the tournament and
                    would come out the winner (call it tweet B)!
                    </Typography>
                </Box>
            </Box>  
            <Box sx={{ display: 'flex', alignItems: 'flex-start', color: '#afafaf', mt: 2, mb: 2 }}>
                <ArrowRightIcon
                    sx={{
                    color: '#36ffe7',
                    marginRight: '6px',
                    }}
                />
                <Box>
                    <Typography
                    variant="body1"
                    component="span"
                    sx={{ fontFamily: 'var(--font-iosevka), monospace', color: '#36ffe7', marginRight: 1 }}
                    >
                    But wait, there&apos;s more! Think about the third angriest tweet. Remember, it has to have lost to the second angriest tweet (tweet B); see where
                    I&apos;m going? We can then run another tournament with all the tweets that lost to B. Once we have the third angriest tweet (call it tweet C), we know 
                    the fourth angriest tweet must have lost tweet C.
                    </Typography>
                </Box>
            </Box>  
            <Box sx={{ display: 'flex', alignItems: 'flex-start', color: '#afafaf', mt: 2, mb: 3 }}>
                <ArrowRightIcon
                    sx={{
                    color: '#36ffe7',
                    marginRight: '6px',
                    }}
                />
                <Box>
                    <Typography
                    variant="body1"
                    component="span"
                    sx={{ fontFamily: 'var(--font-iosevka), monospace', color: '#36ffe7', marginRight: 1 }}
                    >
                    We can just continue this until we have 100000th angriest tweet, which would fully sort everything (or we can also just stop whenever we want if
                    we don&apos;t need to sort everything). 
                    </Typography>
                </Box>
            </Box>  
            This method is extremely efficient for sorting with pairwise comparisons. When it comes to getting the losers for each tweet, we can store it in
            some sort of dictionary or hash map. The complexity ends up being O(K * log(N)), where N is the total number of tweets and K is the number of 
            angriest tweets we want sorted. Something to note is that the initial tournament is MUCH more demanding than future rounds of our tournament.
            The initial tournament does pairwise comparisons for N-1 pairs. However, the winner only plays approximately log base 2 (N) rounds, so 
            the number of tweets that lost to it is also approximately log base 2 (N). This means our future tournaments are much, much smaller. <br/><br/>
            We can get around
            this bottleneck of the initial tournament by running concurrent API calls heavily during the first tournament or running our tournament in parallel.
            We also don&apos;t need to wait for all comparisons in a round to finish before starting the next round. If we have two winners from a round,
            we can face them off in the next round and continue propogate our bracket. However, determining the winner of each tournament is locked by
            every comparison being completed. It can definitely be worth it to just switch our algorithm and brute force compare the remaining candidates when we get to 
            later rounds where there aren&apos;t many candidates left if were able to run our API calls in parallel. 
            <br/><br/>
            Pretty cool right? Well, there is one big hurdle with tournament sort. LLMs aren&apos;t infallible. Noise affects LLMs, so the comparison they return
            isn&apos;t accurate 100% of the time. In tournament sort, the price of this noise can be really high in the worst case. Imagine our best candidate
            loses to the worst candidate in the first round of the tournament. Our best candidate has now only lost to the worst candidate, which means that
            it won&apos;t appear in future tournaments. Obviously, this is extreme, as our LLM probably isn&apos;t THAT bad. Nonetheless, its a problem. We
            can account for this by running multiple iterations of the tournament and taking the average, amongst other things. <br/><br/>
            Anywho, this is just a cool algorithm I thought would be interesting to explain and share given the AI surge right now. 
          </Typography>
        </Box>
      </Collapse>
    </Box>
  );
};

export default BlogPost3;
