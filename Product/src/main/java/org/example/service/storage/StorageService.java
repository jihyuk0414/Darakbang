package org.example.service.storage;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.entity.Product;
import org.example.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class StorageService {

    @Value("${spring.cloud.gcp.storage.bucket}")
    private String bucketName;

    @Value("${spring.cloud.gcp.storage.project-id}")
    private String projectId;

    private final ProductRepository productRepository;

    public String imageUpload(MultipartFile img_product) throws IOException {
        InputStream keyFile = ResourceUtils.getURL("classpath:darakbang-422004-c04b80b50e78.json" ).openStream();
        String product_origin_name =img_product.getOriginalFilename();
        String product_file_name=changedImageName(product_origin_name);
        String product_ext = img_product.getContentType();
        Storage storage = StorageOptions.newBuilder()
                .setCredentials(GoogleCredentials.fromStream(keyFile))
                .build()
                .getService();
        // 이미지 GCP bucket에 저장
        BlobInfo blobInfo_product = storage.create(
                BlobInfo.newBuilder(bucketName, product_file_name)
                        .setContentType(product_ext)
                        .build(),
                img_product.getInputStream()
        );
        return product_file_name;
    }

    public void productImageDelete(Long productId) throws IOException {
        Product product = productRepository.findByProductId(productId);

        String imgProduct = product.getImageProduct().substring(45);
        log.info(imgProduct);

        InputStream keyFile = ResourceUtils.getURL("classpath:darakbang-422004-c04b80b50e78.json" ).openStream();
            Storage storage = StorageOptions.newBuilder()
                    .setCredentials(GoogleCredentials.fromStream(keyFile))
                    .build()
                    .getService();

            Blob blobReal = storage.get(bucketName, imgProduct);

            Storage.BlobSourceOption precondition =
                    Storage.BlobSourceOption.generationMatch(blobReal.getGeneration());
            storage.delete(bucketName, imgProduct, precondition);

    }
    public void realImageDelete(Long productId) throws IOException {
        Product product = productRepository.findByProductId(productId);

        String imgReal = product.getImageReal().substring(45);
        log.info(imgReal);

        InputStream keyFile = ResourceUtils.getURL("classpath:darakbang-422004-c04b80b50e78.json" ).openStream();
        Storage storage = StorageOptions.newBuilder()
                .setCredentials(GoogleCredentials.fromStream(keyFile))
                .build()
                .getService();

        Blob blobReal = storage.get(bucketName, imgReal);

        Storage.BlobSourceOption precondition =
                Storage.BlobSourceOption.generationMatch(blobReal.getGeneration());
        storage.delete(bucketName, imgReal, precondition);

    }
    private static String changedImageName(String originName) {
        String random = UUID.randomUUID().toString();
        return random+originName;
    }

}
