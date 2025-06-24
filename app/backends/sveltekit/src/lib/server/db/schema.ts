import { relations, sql } from 'drizzle-orm';
import { pgTable, serial, integer, text, timestamp, pgEnum, uuid, json } from 'drizzle-orm/pg-core';

export const USERSTATUS = pgEnum('user_status', ['pending', 'approved', 'disabled', 'deleted'])

export const BUDGETSTATUS = pgEnum('budgetstatus', ['pending', 'approved', 'declined', 'deleted'])

export const ACCOUNTTYPE = pgEnum('accounttype', ['user', 'admin', 'superadmin', 'system'])


export const BANKSTATUS = pgEnum('bankstatus', ['approved', 'pending', 'disabled', 'deleted'])



const timestamps = {
	updated_at: timestamp('updated_at', { withTimezone: true, mode: 'date' }),
	created_at: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull(),
	deleted_at: timestamp('deleted_at', { withTimezone: true, mode: 'string' })
} 

// valid
export const user = pgTable('user', {
	id: serial('id'),
	userid: text('userid').primaryKey().default(sql`gen_random_uuid()`).notNull(),
	username: text('username').notNull().unique(),
	firstname: text('firstname').notNull(),
	lastname: text('lastname').notNull(),
	email: text('email').notNull().unique(),
	status: USERSTATUS().notNull().default('approved'),
	accounttype: ACCOUNTTYPE().notNull().default('user'),
	...timestamps
});


// valid
export const protection = pgTable('protection', {
	userid: text('userid').references(()=> user.userid, {onDelete: 'cascade', onUpdate: 'cascade'}),
	password: text('password').notNull(),
	invitationkey: text('invitationkey'),
	...timestamps
});


// valid
export const user_data = pgTable('user_data', {
	id: text('userid').notNull().references(()=> user.userid, {onDelete: 'cascade', onUpdate: 'cascade'}),
	data: json().notNull()
})



// check
export const user_bank = pgTable('user_bank', {
	userid: text('userid').notNull().references(()=> user.userid, {onDelete: 'cascade', onUpdate: 'cascade'}),
	bankname: text('bankname').notNull(),
	bankaccountname: text('bankaccountname').notNull(),
	bankaccountnumber: text('bankaccountnumber').notNull(),
	status: BANKSTATUS('status').notNull().default('approved'),
})

// check
export const user_budget = pgTable('user_budget', {
	userid: text('userid').notNull().references(()=> user.userid, {onDelete: 'cascade', onUpdate: 'cascade'}),
	id: serial('id'),
	budgetid: text('budgetid').primaryKey().default(sql`gen_random_uuid()`).notNull(),
	budgettitle: text('budgettitle').notNull(),
	budgetname: text('budgettemplate_id').notNull(),		
	status: BUDGETSTATUS().notNull().default('pending'),
	approvedby: text('approvedby'),
	...timestamps
});

// valid
export const budget_expense = pgTable('budget_expense', {
	id: text('budgetid').references(()=> user_budget.budgetid, {onDelete: 'cascade', onUpdate: 'cascade'}).notNull(),
	expense_object: json().notNull(),		// just template. static
	expense_composition: json().notNull(),	// template with prices: dynamic. auto update on upload
});

// valid
export const user_transactions = pgTable('user_transaction', {
	id: text('user_id').notNull().references(()=> user.userid, {onDelete: 'cascade', onUpdate: 'cascade'}),
	message: json().notNull(),
	sender: text('sender_id'),
	...timestamps
})

// valid
export const session = pgTable('session', {
	id: text('id').primaryKey().notNull(),
	userId: text('user_id').notNull().references(() => user.userid, {onDelete: 'cascade', onUpdate: 'cascade'}),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});


// valid
export const banks_receipt_templates = pgTable('banks_receipt_template', {
	id: serial('id').notNull(),
	template_id: text("template_id").default(sql`gen_random_uuid()`).notNull(),
	bankname: text('bankname').notNull(),
	template: text('template'),					// save as blob file or b64
	templatename: text('templatename'),
	author: text('author'),
	...timestamps
})


export const registered_budget_templates = pgTable('registerd_templates', {
	id: serial('id').notNull(),
	name: text('budget_name').notNull(),
	budget_expenses: json().notNull().default({expenses: []}),
	author: text('author').notNull(),
	...timestamps
});


/* Export all important schema here */
export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;



/* 
One to Ones
1. user to protection       // ignore
2. user to user_data ✅
3. budget to expense ✅
4. user to session          // ignore
5. expense to budget ✅
6. budget to user    ✅
7. banks to user     ✅
*/

// user -> user_data|banks|budgets|transactions :done
export const usertoDataRelation = relations(user, ({ one, many })=> ({
    data: one(user_data, {
        fields: [user.userid],
        references: [user_data.id]
    }),
	banks: many(user_bank),
	budgets: many(user_budget, { relationName: 'budgets' }),
	transactions: many(user_transactions, { relationName: 'transactions' })
}))





// bank -> user
export const bankToUsersRelation = relations(user_bank, ({ one })=>({
	user: one(user, {
		fields: [user_bank.userid],
		references: [user.userid],
		relationName: 'user'
	})
}))


// budget -> expense
export const budgetToExpenseRelation = relations(user_budget, ({ one })=> ({
    expense: one(budget_expense, {
        fields: [user_budget.userid],
        references: [budget_expense.id],
		relationName: 'expense'
    })
}))

// ambiguity check: always append if needed
export const userRelationstoBudgetandTransactions = relations(user, ({ many, one })=>({
	budgets: many(user_budget, { relationName: 'user' }),
	transactions: many(user_transactions, { relationName: 'user' }),
    data: one(user_data, {
        fields: [user.userid],
        references: [user_data.id]
    }),
	banks: many(user_bank),

}))

export const usertoBudgetRelation = relations(user_budget, ({ one })=>({
	user: one(user, {
		fields: [user_budget.userid],
		references: [user.userid],
		relationName: 'user'
	})
}))

export const usertoTransactionsRelation = relations(user_transactions, ({ one })=>({
	user: one(user, {
		fields: [user_transactions.id],
		references: [user.userid],
		relationName: 'user'
	})
}))










// /*
// One to Many 
// 1. user to banks
// 2. user to budgets
// 3. user to transactions
// */

// export const userRelationstoAttachedBanks = relations(user, ({many})=> ({
//     banks: many(user_bank)
// }))

// export const userRelationstoBudgets = relations(user, ({many})=> ({
//     budgets: many(user_budget)
// }))

// export const userRelationstoTransactions = relations(user, ({many})=> ({
//     transactions: many(user_transactions)
// }))



/* Many to Many */