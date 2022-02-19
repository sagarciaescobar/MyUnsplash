FROM adoptopenjdk/openjdk11:latest
ADD ./target/myunsplash-0.0.1-SNAPSHOT.jar myunsplash.jar
RUN mkdir ./storage
CMD [ "sh", "-c", "java -Xmx300m -Xss512k -XX:CICompilerCount=2 -Dfile.encoding=UTF-8 -XX:+UseContainerSupport -DDATABASE_ACCESSURL=$DATABASE_ACCESSURL -DDATABASE_USER=$DATABASE_USERNAME -DDATABASE_PASSWORD=$DATABASE_PASSWORD -DCLOUD_NAME=$CLOUD_NAME -DCLOUD_API_KEY=$CLOUD_API_KEY -DCLOUD_API_SECRET=$CLOUD_API_SECRET -Dserver.port=$PORT -Djava.security.egd=file:/dev/./urandom -jar myunsplash.jar"]