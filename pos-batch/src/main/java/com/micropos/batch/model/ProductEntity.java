package com.micropos.batch.model;

import lombok.Data;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "product")
public class ProductEntity {

    private String name;

    @Id
    private String id;

    private double price;

    private String image;
}
