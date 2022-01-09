package com.dev.myunsplash.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Image {

    @Id
    @GenericGenerator(name = "uuid",strategy = "uuid2")
    @GeneratedValue(generator = "uuid" ,strategy = GenerationType.AUTO)
    @Column(length = 36,nullable = false,updatable = false)
    private String fileId;
    private String fileName;
    private String label;
    private String fileType;
    private String filePath;
    private String fileUrl;

    public Image(String fileName, String label, String fileType, String filePath, String fileUrl) {
        this.fileName = fileName;
        this.label = label;
        this.fileType = fileType;
        this.filePath = filePath;
        this.fileUrl = fileUrl;
    }

    public Image(String fileName, String label, String fileType){
        this.fileName = fileName;
        this.label = label;
        this.fileType = fileType;
    }

    public Image(){};

}