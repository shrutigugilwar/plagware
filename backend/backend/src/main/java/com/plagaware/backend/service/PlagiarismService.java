package com.plagaware.backend.service;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PlagiarismService {

    // Calculates Cosine Similarity between two texts
    public double calculateSimilarity(String text1, String text2) {
        Map<String, Integer> freq1 = getWordFrequency(text1);
        Map<String, Integer> freq2 = getWordFrequency(text2);

        Set<String> allWords = new HashSet<>();
        allWords.addAll(freq1.keySet());
        allWords.addAll(freq2.keySet());

        int[] vec1 = new int[allWords.size()];
        int[] vec2 = new int[allWords.size()];

        int i = 0;
        for (String word : allWords) {
            vec1[i] = freq1.getOrDefault(word, 0);
            vec2[i] = freq2.getOrDefault(word, 0);
            i++;
        }

        return cosine(vec1, vec2);
    }

    private Map<String, Integer> getWordFrequency(String text) {
        Map<String, Integer> freq = new HashMap<>();
        String[] words = text.split("\\W+");
        for (String word : words) {
            if (!word.isBlank()) {
                freq.put(word.toLowerCase(), freq.getOrDefault(word.toLowerCase(), 0) + 1);
            }
        }
        return freq;
    }

    private double cosine(int[] vec1, int[] vec2) {
        int dot = 0, mag1 = 0, mag2 = 0;
        for (int i = 0; i < vec1.length; i++) {
            dot += vec1[i] * vec2[i];
            mag1 += vec1[i] * vec1[i];
            mag2 += vec2[i] * vec2[i];
        }
        return (mag1 == 0 || mag2 == 0) ? 0.0 : dot / (Math.sqrt(mag1) * Math.sqrt(mag2));
    }
    public double calculateLCSSimilarity(String a, String b) {
        int lcsLength = longestCommonSubsequence(a, b);
        int avgLength = (a.length() + b.length()) / 2;
        return (double) lcsLength / avgLength;
    }

    private int longestCommonSubsequence(String a, String b) {
        int[][] dp = new int[a.length() + 1][b.length() + 1];

        for (int i = 1; i <= a.length(); i++) {
            for (int j = 1; j <= b.length(); j++) {
                if (a.charAt(i - 1) == b.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }

        return dp[a.length()][b.length()];
    }

}
