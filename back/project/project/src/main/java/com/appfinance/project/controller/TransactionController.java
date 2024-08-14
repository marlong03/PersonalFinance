package com.appfinance.project.controller;

import com.appfinance.project.model.Transaction;
import com.appfinance.project.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:4200")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping
    public ResponseEntity<Transaction> createTransaction(@RequestBody Transaction transaction) {
        Transaction createdTransaction = transactionService.saveTransaction(transaction);
        return new ResponseEntity<>(createdTransaction, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transaction> updateTransaction(@PathVariable Integer id, @RequestBody Transaction updatedTransaction) {
        Optional<Transaction> existingTransaction = transactionService.getTransactionById(id);
        
        if (existingTransaction.isPresent()) {
            Transaction transaction = existingTransaction.get();
            transaction.setCategory(updatedTransaction.getCategory());
            transaction.setAmount(updatedTransaction.getAmount());
            transaction.setDescription(updatedTransaction.getDescription());
            transaction.setType(updatedTransaction.getType());
            Transaction savedTransaction = transactionService.saveTransaction(transaction);
            return new ResponseEntity<>(savedTransaction, HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transaction> getTransactionById(@PathVariable Integer id) {
        Transaction transaction = transactionService.getTransactionById(id)
        .orElse(null);
        return ResponseEntity.ok(transaction);
    }


    @GetMapping
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        List<Transaction> transactions = transactionService.getAllTransactions();
        return ResponseEntity.ok(transactions);
    }
    //Obtener lista de objetos por nombre de la categoria
    @GetMapping("/by-category/{category}")
    public ResponseEntity<List<Transaction>> getAllTransactions(@PathVariable String category) {
        List<Transaction> transactions = transactionService.getTransactionsByCategory(category);
        return ResponseEntity.ok(transactions);
    }
    //Obtener lista de objetos ingresando 2 fechas
   @GetMapping("/by-date/{startDateString}/{endDateString}")
    public ResponseEntity<List<Transaction>> getTransactionsByDateBetween(@PathVariable String startDateString, @PathVariable String endDateString) {

        //Casteamos los textos
        LocalDate startDate;
        LocalDate endDate;

        startDate = LocalDate.parse(startDateString);
        endDate = LocalDate.parse(endDateString);

        List<Transaction> transactions = transactionService.getTransactionsByDateBetween(startDate, endDate);
        return ResponseEntity.ok(transactions);
    }
    //Obtener resumen de totales de objeto
    @GetMapping("/summary")
    public Map<String, Double> getTotals() {
        double incomeTotal = transactionService.sumIncomes();
        double expenseTotal = transactionService.sumExpenses();

        Map<String, Double> response = new HashMap<>();
        response.put("incomes", incomeTotal);
        response.put("expenses", expenseTotal);
        response.put("total", incomeTotal - expenseTotal);
        return response;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Integer id) {
        transactionService.deleteTransaction(id);
        return ResponseEntity.noContent().build();
    }
    
}
