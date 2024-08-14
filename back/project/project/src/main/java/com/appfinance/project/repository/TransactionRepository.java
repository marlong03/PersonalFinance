
package com.appfinance.project.repository;

import com.appfinance.project.model.Transaction;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface TransactionRepository extends CrudRepository<Transaction,Integer> {
    
    List<Transaction> findByCategory(String category);

    @Query("SELECT t FROM Transaction t WHERE t.date BETWEEN :startDate AND :endDate")
    List<Transaction> findByDateBetween(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.type = 'Income'")
    double sumIncomes();

    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.type = 'Expense'")
    double sumExpenses();
}
