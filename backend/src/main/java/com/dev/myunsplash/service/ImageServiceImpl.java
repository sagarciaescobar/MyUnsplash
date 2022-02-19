package com.dev.myunsplash.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.dev.myunsplash.exception.IdNotFound;
import com.dev.myunsplash.exception.NoSuchAImage;
import com.dev.myunsplash.model.Image;
import com.dev.myunsplash.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.couchbase.CouchbaseProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.core.env.StandardEnvironment;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

import static java.time.temporal.ChronoUnit.SECONDS;

@Service
@Log4j
@RequiredArgsConstructor
public class ImageServiceImpl implements IImageService {


    private final Environment env;
    private final ImageRepository imageRepository;
    private final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");

    /*-----------------------------------------Search all-----------------------------------------------------------*/
    @Override
    public List<Image> findAll() {
        log.info("Listando todas las imagenes");
        return imageRepository.findAll(Sort.by(Sort.Direction.DESC, "uploadDate"));
    }

    /*-----------------------------------------Save by URL-----------------------------------------------------------*/
    @Override
    public Image saveByUrl(String stringUrl, String label) throws IOException, URISyntaxException, InterruptedException, NoSuchAImage {

        HttpRequest request = HttpRequest.newBuilder()
                .uri(new URI(stringUrl))
                .timeout(Duration.of(100, SECONDS))
                .GET()
                .build();
        HttpResponse<byte[]> response = HttpClient.newBuilder()
                .build()
                .send(request, HttpResponse.BodyHandlers.ofByteArray());
        System.out.println(response.headers().toString());
        System.out.println(response.body());
        MediaType contentType = MediaType.parseMediaType(response.headers().map().get("content-type").get(0));
        if (contentType.getType().startsWith("image")) {
            String urlPath = new URL(stringUrl).toURI().getPath();
            Image image = new Image(urlPath + "." + contentType.getSubtype(), label, contentType.toString(), stringUrl);
            image.setFileUrl(stringUrl);
            image.setUploadDate(sdf.format(new Timestamp(System.currentTimeMillis())));
            Image img = imageRepository.save(image);
            log.info("Guardando imagen por Url con id: " + img.getFileId());
            return img;
        } else {
            throw new NoSuchAImage("Url does not contain a image content type");
        }
    }

    /*-----------------------------------------Upload by file-----------------------------------------------------------*/
    @Override
    public Image uploadImage(MultipartFile file, String label) throws Exception {
        MediaType contentType = MediaType.parseMediaType(Objects.requireNonNull(file.getContentType()));
        if (contentType.getType().startsWith("image")) {
            Image image = new Image(file.getOriginalFilename(), label, file.getContentType());
            Image imageSave = imageRepository.save(image);
            byte[] data = file.getBytes();
            Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
                    "cloud_name", env.getProperty("cloud.cloud_name"),
                    "api_key", env.getProperty("cloud.api_key"),
                    "api_secret", env.getProperty("cloud.api_secret")));
            Map cloudinaryData = cloudinary.uploader().upload(data, ObjectUtils.asMap("upload_preset", "mbvyp8lg","public_id",imageSave.getFileId()));
            image.setFileUrl((String) cloudinaryData.get("secure_url"));
            image.setUploadDate(sdf.format(new Timestamp(System.currentTimeMillis())));
            Image img = imageRepository.save(image);
            log.info("Guardando imagen por Archivo con id: " + img.getFileId());
            return img;
        } else {
            throw new NoSuchAImage("File does not have supported media type");
        }

    }

    /*-----------------------------------------delete by id-----------------------------------------------------------*/
    @Override
    public void deleteById(String id) throws Exception {
        Optional<Image> image = imageRepository.findById(id);
        if (image.isPresent()) {
            Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
                    "cloud_name", env.getProperty("cloud.cloud_name"),
                    "api_key", env.getProperty("cloud.api_key"),
                    "api_secret", env.getProperty("cloud.api_secret")));
            if(image.get().getFileUrl().startsWith("https://res.cloudinary.com")){
                Map api = cloudinary.uploader().destroy(id, ObjectUtils.asMap("upload_preset","mbvyp8lg"));
                System.out.println(api);
            }
            imageRepository.deleteById(id);
        } else {
            throw new IdNotFound("Este id no existe");
        }
    }
}