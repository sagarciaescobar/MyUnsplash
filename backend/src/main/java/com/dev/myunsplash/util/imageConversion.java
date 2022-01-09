package com.dev.myunsplash.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class imageConversion {
    public static String  imageExtension(String name) throws Exception {
        Pattern rx = Pattern.compile("\\.[0-9a-z]+$");
        Matcher matcher = rx.matcher(name);
        String extension = matcher.find() ? matcher.group(0) : null ;
        if(extension == null) throw new Exception("No se encontró extension del archivo");
        return extension;
    }
}
