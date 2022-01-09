package com.dev.myunsplash.service;

import com.dev.myunsplash.model.Image;
import com.dev.myunsplash.repository.ImageRepository;
import com.dev.myunsplash.util.imageConversion;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
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
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Duration;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import static java.time.temporal.ChronoUnit.SECONDS;

@Service
@Log4j
public class ImageServiceImpl implements IImageService{

    @Autowired
    ImageRepository imageRepository;

    @Override
    public List<Image> findAll() {
        log.info("Listando todas las imagenes");
        return imageRepository.findAll();
    }

    @Override
    public Image save(Image image) {
        Image img = imageRepository.save(image);
        log.info("Guardando imagen id: "+img.getFileId());
        return img;
    }

    @Override
    public Image saveByUrl(String stringUrl, String label) throws IOException, URISyntaxException, InterruptedException {
        HttpRequest request=HttpRequest.newBuilder()
                .uri(new URI(stringUrl))
                .timeout(Duration.of(100, SECONDS))
                .GET()
                .build();
        HttpResponse<byte[]> response = HttpClient.newBuilder()
                .build()
                .send(request, HttpResponse.BodyHandlers.ofByteArray());
        MediaType contentType = MediaType.parseMediaType(response.headers().map().get("content-type").get(0).toString());
        String urlPath = new URL(stringUrl).toURI().getPath();
        Image image = new Image(urlPath + "." + contentType.getSubtype(),label ,contentType.toString(),null, stringUrl);
        image.setFileUrl(stringUrl);
        Image img = imageRepository.save(image);
        log.info("Guardando imagen por Url con id: "+img.getFileId());
        return img;
    }


    @Override
    public Image uploadImage(MultipartFile file, String label) throws Exception {
        String fileExtension = imageConversion.imageExtension(file.getOriginalFilename());
        Stream<Path> storage = Files.list(Path.of("./storage"));
        if(storage.count()>50){
            List<Image> images = imageRepository.findAll();
            for (Image image: images) {
                Files.deleteIfExists(Paths.get("./storage/uploaded_"+ image.getFileId()+ fileExtension));
                imageRepository.deleteAll();
            }
        }
        Image image = new Image( file.getOriginalFilename(),label,file.getContentType());
        Image imageSave = imageRepository.save(image);
        String FILE_DIRECTORY = "./storage/uploaded_";
        Path path = Paths.get(FILE_DIRECTORY + imageSave.getFileId() + fileExtension);
        byte[] data = file.getBytes();
        Files.write(path,data);
        image.setFilePath(path.toString());
        image.setFileId(imageSave.getFileId());
        image.setFileUrl("http://localhost:8080/"+image.getFileId());
        Image img = imageRepository.save(image);
        log.info("Guardando imagen por Archivo con id: "+img.getFileId());
        return img;
    }

    @Override
    public void deleteById(String id) throws Exception {
        Optional<Image> image = imageRepository.findById(id);
        if(image.isPresent()){
            if(image.get().getFilePath() != null){
                String fileExtension = imageConversion.imageExtension(image.get().getFileName());
                Files.deleteIfExists(Paths.get("./storage/uploaded_"+ image.get().getFileId()+ fileExtension));
                imageRepository.deleteById(id);
            }else {
                imageRepository.deleteById(id);
            }
        }else{
            throw new Exception("Este id no existe");
        }
    }

    @Override
    public ByteArrayResource downloadImage(String id) throws Exception {
        log.info("descargando imagen");
        Image image = imageRepository.getById(id);
        if(image.getFilePath() == null){
            throw new Exception("Este recurso no esta disponible");
        }
        return new ByteArrayResource(Files.readAllBytes(Paths.get(image.getFileUrl())));
    }
}