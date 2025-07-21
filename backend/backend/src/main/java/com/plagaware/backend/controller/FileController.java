package com.plagaware.backend.controller;

import com.plagaware.backend.model.FileUpload;
import com.plagaware.backend.repository.FileUploadRepository;
import com.plagaware.backend.service.PlagiarismService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/files")
@CrossOrigin
public class FileController {

    @Autowired
    private FileUploadRepository fileRepo;

    @Autowired
    private PlagiarismService plagiarismService;

    @PostMapping("/upload")
    public FileUpload uploadFile(@RequestBody FileUpload file) {
        return fileRepo.save(file);
    }

    @GetMapping("/all")
    public List<FileUpload> getAllFiles() {
        return fileRepo.findAll();
    }

    @PostMapping("/compare")
    public ResponseEntity<?> compareFiles(
            @RequestParam String algorithm,
            @RequestBody List<Long> fileIds
    ) {
        if (fileIds.size() != 2) {
            return ResponseEntity.badRequest().body(Map.of("error", "Please send 2 file IDs"));
        }

        FileUpload f1 = fileRepo.findById(fileIds.get(0)).orElse(null);
        FileUpload f2 = fileRepo.findById(fileIds.get(1)).orElse(null);

        if (f1 == null || f2 == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "One or both files not found"));
        }

        double similarity;
        if (algorithm.equalsIgnoreCase("cosine")) {
            similarity = plagiarismService.calculateSimilarity(f1.getContent(), f2.getContent());
        } else if (algorithm.equalsIgnoreCase("lcs")) {
            similarity = plagiarismService.calculateLCSSimilarity(f1.getContent(), f2.getContent());
        } else {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid algorithm. Use 'cosine' or 'lcs'."));
        }

        String result = algorithm.toUpperCase() + " Similarity: " + Math.round(similarity * 100) + "%";
        return ResponseEntity.ok(Map.of("result", result));
    }
}
