package com.appfinance.project.service;



import com.appfinance.project.model.Transaction;
import com.appfinance.project.repository.TransactionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public Optional<Transaction> getTransactionById(Integer id) {
        return transactionRepository.findById(id);
    }

    public List<Transaction> getAllTransactions() {
        List<Transaction> transactions = new ArrayList<>();
        transactionRepository.findAll().forEach(transaction -> transactions.add(transaction));
        return transactions;
    }
    public List<Transaction> getTransactionsByCategory(String category) {
        List<Transaction> transactions = new ArrayList<>();
        transactionRepository.findByCategory(category).forEach(transaction -> transactions.add(transaction));
        return transactions;
    }

    public List<Transaction> getTransactionsByDateBetween(LocalDate startDate, LocalDate endDate) {
        return transactionRepository.findByDateBetween(startDate, endDate);
    }

    public void deleteTransaction(Integer id) {
        transactionRepository.deleteById(id);
    }
    
    public double sumIncomes() {
        return transactionRepository.sumIncomes();
    }

    public double sumExpenses() {
        return transactionRepository.sumExpenses();
    }
}
