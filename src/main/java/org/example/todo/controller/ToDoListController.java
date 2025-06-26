package org.example.todo.controller;

import org.example.todo.model.Item;
import org.example.todo.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:63342")
@RestController
@RequestMapping("/api/todo")
public class ToDoListController {

    @Autowired
    private ItemService service;

    @GetMapping
    public List<Item> getAllItems() {
        return service.getAllItems();
    }
    @GetMapping("/{id}")
    public Item getItemById(@PathVariable Long id) {
        return service.getItemById(id);

    }
    @PostMapping
    public Item createItem(@RequestBody Item item) {
        return service.saveOrUpdate(item);
    }

    @PutMapping("/{id}")
    public Item updateItem(@PathVariable Long id, @RequestBody Item item) {
        item.setId(id);
        return service.saveOrUpdate(item);

    }
    @DeleteMapping("/{id}")
    public void deleteItemById(@PathVariable Long id) {
        service.deleteItemById(id);
    }
}