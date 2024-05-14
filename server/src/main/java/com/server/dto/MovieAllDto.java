package com.server.dto;

import lombok.Getter;

@Getter
public class MovieAllDto<T> {

    private T data;
    private PageInfo pageInfo;

    public MovieAllDto(T data, PageInfo pageInfo) {
        this.data = data;
        this.pageInfo = pageInfo;
    }
}
