package com.server.config;

import com.server.dto.RatingDto;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Configuration
public class MovieConfig {
    @Bean
    public Map<Long, Long> MovieIdToTid() {
        Map<Long, Long> movieIdToTid = new HashMap<>();

        File csv = new File("src/main/resources/static/links.csv");
        BufferedReader br = null;
        try {
            br = new BufferedReader(new BufferedReader(new FileReader(csv)));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        String line = "";
        boolean skipFirstLine = true;
        while (true) {
            try {
                assert br != null;
                if ((line = br.readLine()) == null) break;
            } catch (IOException e) {
                e.printStackTrace();
            }

            if (skipFirstLine) {
                skipFirstLine = false;
                continue;
            }

            String[] token = line.split(",");

            if(token.length > 2) {
                Long movieId = Long.parseLong(token[0]);
                Long tId = Long.parseLong(token[2]);

                movieIdToTid.put(movieId, tId);
            }

        }
        return movieIdToTid;
    }

    @Bean
    public List<RatingDto> ratingData() {
        List<RatingDto> ratings = new ArrayList<>();

        File csv = new File("src/main/resources/static/ratings.csv");
        BufferedReader br = null;
        try {
            br = new BufferedReader(new BufferedReader(new FileReader(csv)));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        String line = "";
        boolean skipFirstLine = true;
        while (true) {
            try {
                assert br != null;
                if ((line = br.readLine()) == null) break;
            } catch (IOException e) {
                e.printStackTrace();
            }

            if (skipFirstLine) {
                skipFirstLine = false;
                continue;
            }

            String[] token = line.split(",");

            if(token.length > 3) {
                Long movieId = Long.parseLong(token[1]);
                double rating = Double.parseDouble(token[2]);

                ratings.add(new RatingDto(movieId, rating));
            }
        }

        return ratings;
    }
}
