package com.financeai.service;

import com.financeai.dto.request.LoginRequest;
import com.financeai.dto.request.RegisterRequest;
import com.financeai.dto.response.LoginResponse;
import com.financeai.dto.response.RegisterResponse;

public interface UserService {

    RegisterResponse register(RegisterRequest request);

    LoginResponse login(LoginRequest request);
}