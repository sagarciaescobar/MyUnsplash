package com.dev.myunsplash.controller;

import com.dev.myunsplash.exception.NoSuchAImage;
import com.dev.myunsplash.model.Image;
import com.dev.myunsplash.service.ImageServiceImpl;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api")
@Log4j
@CrossOrigin(value = {"https://sagarciaescobar.github.io/MyUnsplash/"}, methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE})
public class ImageController {

    @Autowired
    ImageServiceImpl imageServiceImpl;

    @GetMapping("/images/all")
    public ResponseEntity<?> findAll(){
        List<Image> images=imageServiceImpl.findAll();
        return ResponseEntity.ok()
                .body(images);
    }
    @PostMapping(value = "/images/saveByFile")
    public ResponseEntity<Image> saveByFile(@RequestParam("file") MultipartFile file,@RequestParam("label") String label) throws Exception {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/images/save").toUriString());
        return ResponseEntity.created(uri).body(imageServiceImpl.uploadImage(file,label));
    }

    @PostMapping(value = "/images/saveByUrl")
    public ResponseEntity<Image> saveByUrl(@RequestParam("url") String url,@RequestParam("label") String label) throws IOException, URISyntaxException, InterruptedException, NoSuchAImage {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/images/save").toUriString());
        return ResponseEntity.created(uri).body(imageServiceImpl.saveByUrl(url,label));
    }

    @DeleteMapping("/images/{id}")
    public ResponseEntity<?> deleteById(@PathVariable String id) throws Exception {
        imageServiceImpl.deleteById(id);
        return ResponseEntity.ok().body("Image deleted");
    }
}