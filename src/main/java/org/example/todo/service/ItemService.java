package org.example.todo.service;

import org.example.todo.repository.ItemRepository;
import org.example.todo.model.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {
    @Autowired
    private ItemRepository itemRepo;

    public List<Item> getAllItems() {
        return itemRepo.findAll();
    }
    public Item getItemById(Long id) {
        return itemRepo.findById(id).orElse(null);
    }
    public Item saveOrUpdate(Item item) {
        return itemRepo.save(item);
    }
    public void deleteItemById(Long id) {
        itemRepo.deleteById(id);
    }
}
