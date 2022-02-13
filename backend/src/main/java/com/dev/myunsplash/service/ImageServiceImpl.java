package com.dev.myunsplash.service;

import com.dev.myunsplash.exception.IdNotFound;
import com.dev.myunsplash.exception.NoSuchAImage;
import com.dev.myunsplash.model.Image;
import com.dev.myunsplash.repository.ImageRepository;
import com.dev.myunsplash.util.imageConversion;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
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
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.Clock;
import java.time.Duration;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Stream;

import static java.time.temporal.ChronoUnit.SECONDS;

@Service
@Log4j
@RequiredArgsConstructor
public class ImageServiceImpl implements IImageService{

    private final ImageRepository imageRepository;
    private final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");

    /*-----------------------------------------Search all-----------------------------------------------------------*/
    @Override
    public List<Image> findAll() {
        log.info("Listando todas las imagenes");
        return imageRepository.findAll(Sort.by(Sort.Direction.DESC,"uploadDate"));
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
        if(contentType.getType().startsWith("image")){
            String urlPath = new URL(stringUrl).toURI().getPath();
            Image image = new Image(urlPath + "." + contentType.getSubtype(),label ,contentType.toString(),null, stringUrl);
            image.setFileUrl(stringUrl);
            image.setUploadDate(sdf.format(new Timestamp(System.currentTimeMillis())));
            Image img = imageRepository.save(image);
            log.info("Guardando imagen por Url con id: "+img.getFileId());
            return img;
        }else{
            throw new NoSuchAImage("Url does not contain a image content type");
        }
    }

    /*-----------------------------------------Upload by file-----------------------------------------------------------*/
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
        MediaType contentType = MediaType.parseMediaType(Objects.requireNonNull(file.getContentType()));
        if(contentType.getType().startsWith("image")){
            Image image = new Image( file.getOriginalFilename(),label,file.getContentType());
            Image imageSave = imageRepository.save(image);
            String FILE_DIRECTORY = "./storage/uploaded_";
            Path path = Paths.get(FILE_DIRECTORY + imageSave.getFileId() + fileExtension);
            byte[] data = file.getBytes();
            Files.write(path,data);
            image.setFilePath(path.toString());
            image.setFileId(imageSave.getFileId());
            image.setFileUrl("https://myunsplash-app.herokuapp.com/api/images/"+image.getFileId());
            image.setUploadDate(sdf.format(new Timestamp(System.currentTimeMillis())));
            Image img = imageRepository.save(image);
            log.info("Guardando imagen por Archivo con id: "+img.getFileId());
            return img;
        }else{
            throw new NoSuchAImage("File does not have supported media type");
        }

    }

    /*-----------------------------------------delete by id-----------------------------------------------------------*/
    @Override
    public void deleteById(String id) throws Exception {
        Optional<Image> image = imageRepository.findById(id);
        if(image.isPresent()){
            if(image.get().getFilePath() != null){
                String fileExtension = imageConversion.imageExtension(image.get().getFileName());
                Files.deleteIfExists(Paths.get("./storage/uploaded_"+ image.get().getFileId()+ fileExtension));
            }
            imageRepository.deleteById(id);
        }else{
            throw new IdNotFound("Este id no existe");
        }
    }

    /*-----------------------------------------get by id-----------------------------------------------------------*/
    @Override
    public ByteArrayResource downloadImage(String id) throws Exception {
        log.info("descargando imagen");
        System.out.println(id);
        Image image = imageRepository.getById(id);
        if(image.getFilePath() == null){
            throw new Exception("Este recurso no esta disponible");
        }
        System.out.println(image);
        System.out.println(image.getFilePath());
        System.out.println(image.getFilePath());
        System.out.println(image.getFileType());
        return new ByteArrayResource(Files.readAllBytes(Paths.get(image.getFilePath())));
    }
}