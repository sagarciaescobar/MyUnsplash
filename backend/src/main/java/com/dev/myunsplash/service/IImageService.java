package com.dev.myunsplash.service;

import com.dev.myunsplash.exception.NoSuchAImage;
import com.dev.myunsplash.model.Image;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;

public interface IImageService {
    List<Image> findAll();
    Image saveByUrl(String url,String label) throws IOException, URISyntaxException, InterruptedException, NoSuchAImage;
    ByteArrayResource downloadImage(String id) throws Exception;
    Image uploadImage(MultipartFile file, String label) throws Exception;
    void deleteById(String id) throws Exception;
}
