package com.dev.myunsplash.service;

import com.dev.myunsplash.model.AppUser;
import com.dev.myunsplash.model.Role;

import java.util.List;

public interface IUserService {
    AppUser saveUser(AppUser appUser);
    Role saveRole(Role role);
    void addRoleToUser(String userName, String roleName);
    AppUser getUser(String Name);
    List<AppUser> getUsers();
}
