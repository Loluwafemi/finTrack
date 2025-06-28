<script lang="ts">
    import { enhance } from '$app/forms';
    import { onMount } from 'svelte';
    import Modal from '../components/modal.svelte';


    export let data;

    onMount(()=>{
        const b1 = document.querySelector('.expenseAdd')
        const b2 = document.querySelector('.expenseRem')
        
        b1?.addEventListener('click', ()=>{
            let expenseDOM = document.querySelector('#expense_space')   // space
            let expenses = document.querySelector('.expenses')          // child
            let expenseContent = expenses?.innerHTML
            expenseDOM?.insertAdjacentHTML('beforeend', expenses?.outerHTML)
            
        })

        b2?.addEventListener('click', (e)=>{
            let expenseDOM = document.querySelector('#expense_space')   // space
            console.log(e.currentTarget);
            
        })
    })

    let selectedBudgetCategory: any;

    let budgetData = {
        title: '',
        name: '',
        total: 0,
        expenses: []
    }

    let budgetPayload = {
        name: null,
        cost: null
    }


    function addExpense() {
        if (budgetPayload.cost && budgetPayload.name) {

            budgetData.expenses.push({name: budgetPayload.name, cost: budgetPayload.cost})

            budgetData = budgetData

            budgetPayload.cost = null
            budgetPayload.name = null
        }
    }

</script>

<style>
    th {
        padding: 4px;
        border: black 1px solid;
    }

    
    td {
        padding: 2px;
        border: black 1px solid;
    }
</style>


<div class="p-4 flex flex-col justify-center items-center h-screen bg-gray-300">
        <div class="flex flex-row">
            {#if data.session}
            <div class="flex bg-white p-2 rounded shadow mx-2 items-center">
                <p>Logout to create new account</p>
            </div>
            {:else}
            <div class=" bg-white p-4 rounded mx-4 shadow">
                <div>
                    <h1>Form Testing</h1>
                    <h3 class="text-xl text-center font-bold">Create & Delete Form</h3>
                </div>
                <form class="flex flex-col" action="?/create" method="post" use:enhance>
                    <div class="flex flex-row">
                        <div class="flex flex-col border-b-1 p-3">
                            <label for="firstname">First Name</label>
                            <input name="firstname" class="border p-1" type="text" id="firstname" />
                        </div>
                        <div class="flex flex-col border-b-1 p-3">
                            <label for="lastname">Last Name</label>
                            <input name="lastname" class="border p-1" type="text" id="lastname" />
                        </div>
                        <div class="flex flex-col border-b-1 p-3">
                            <label for="username">Username</label>
                            <input name="username" readonly={true} class="border p-1" type="text" id="lastname" />
                        </div>
                    </div>
                    <div class="flex flex-row">
                        <div class="flex flex-col border-b-1 p-3">
                            <label for="email">Email</label>
                            <input name="email" class="border p-1" type="text" id="email" />
                        </div>
                        <div class="flex flex-col border-b-1 p-3">
                            <label for="password">password</label>
                            <input name="password" class="border p-1" type="password" id="password" />
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <button class="m-2 p-2 text-white bg-black rounded" type="submit">Submit</button>
                    </div>
                </form>
            </div>
            {/if}
            <div class=" bg-white p-4 shadow pb-0 rounded">
                <div>
                    <h1>Form Testing</h1>
                    <h3 class="text-xl text-center font-bold">Login Form</h3>
                </div>

            {#if data.session}
                <div>
                    <p>Name: {data.auth.username}!</p>
                    <p>Email: {data.auth.email}</p>
                    <p>status: {data.auth.status}</p>
                    <p>Type: {data.auth.accounttype}</p>
                </div>
            {:else}
                <form class="flex flex-col" action="?/login" method="post">
                    <div class="flex flex-row">
                        <div class="flex flex-col border-b-1 p-3">
                            <label for="email">Email</label>
                            <input name="email" class="border p-1" type="text" id="email" />
                        </div>
                        <div class="flex flex-col border-b-1 p-3">
                            <label for="password">password</label>
                            <input name="password" class="border p-1" type="password" id="password" />
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <button class="m-2 p-2 text-white bg-black rounded" type="submit">Login</button>
                    </div>
                </form>
            {/if}

                {#if data.session}
                <div class="mt-8 px-2">
                    <form action="?/logout" method="post">
                        <p>Is logged ?: <span class="p-1 rounded bg-green-500">True</span></p>
                        <div class="flex flex-col">
                            <button class="m-2 p-2 text-white bg-red-800 rounded" type="submit">Logout</button>
                        </div>
                    </form>
                </div>
                {:else}
                <div class="mt-8 px-2 text-center">
                    <p>Signin first</p>
                </div>
                {/if}
            </div>
        </div>

        <div class=" bg-white p-4 rounded my-6">
            {#if data.users.length > 0}
                <table>
                    <tbody>
                        <tr>
                            <th>id</th>
                            <th>firstname</th>
                            <th>lastname</th>
                            <th>username</th>
                            <th>email</th>
                            <th>status</th>
                            <th>accounttype</th>
                            <th>created_at</th>
                        </tr>
                    {#each data.users as user}
                        <tr>
                            <td>{user.id}</td>
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.status}</td>
                            <td>{user.accounttype}</td>
                            <td>{user.created_at}</td>
                            <td>
                                <form action="?/delete" method="post">
                                    <input name="userid" type="text" value={user.userid} hidden={true} />
                                    <button type="submit" class="p-2 bg-black text-white rounded m-2">
                                    Delete
                                </button>
                                </form>
                            </td>
                        </tr>
                    {/each}
                    </tbody>
                </table>
            {:else}
                <p class="mx-auto text-center">No Data on Database yet</p>
            {/if}
        </div>
</div>

{#if data.session}
    <div class="p-4 flex flex-col justify-center items-center h-screen bg-gray-300">
            <div class=" bg-white p-4 rounded">
                <div>
                    <h1>Form Testing</h1>
                    <h3 class="text-xl text-center font-bold">
                        Create Buget & Approval Form
                    </h3>
                </div>
                <form class="flex flex-col" action="?/addBuget" method="post">
                    <div class="flex flex-row">
                        <div class="flex flex-col border-b-1 p-3">
                            <label for="username">Select Budget Category</label>
                            <!-- fetch all registerd expense template -->
                            <select class="border-black border p-1 rounded" bind:value={selectedBudgetCategory} name="" id="">
                                {#each data.registeredBudget as budget}
                                <option value={budget.name}>{budget.name}</option>
                                {/each}
                                <option value="custom">custom</option>
                            </select>
                        </div>

                        <!-- input to be submitted -->
                        <input name="budgets" hidden={true} type="text" value={JSON.stringify(budgetData)} />


                        <div class="flex flex-col border-b-1 p-3">
                            <label for="budgetname">Budget Name</label>
                            <input bind:value={budgetData.title} class="border p-1" type="text" id="budgetname" />
                        </div>

                    </div>
                    {#if selectedBudgetCategory == 'custom'}
                        <div class="flex flex-col">
                            <input bind:value={budgetData.name} placeholder="Enter Custom Budget Category" class="p-1 m-2 border-black border-1" />
                        </div>
                        <div>
                            <input bind:value={budgetPayload.name} type="text" placeholder="Expense title" class="p-2 m-2" />
                            <input bind:value={budgetPayload.cost} type="text" placeholder="Cost of Expense" class="p-2 m-2" />
                        </div>
                        {#each budgetData.expenses as expense}
                            <div class="expense cards flex flex-col m-2">
                                <div class="bg-gray-300 p-4 rounded">

                                        <div class="flex flex-row justify-between">
                                            <span class="text-xl">{expense.name}</span>
                                            <span class="text-green text-bold">{expense.cost}</span>
                                        </div>

                                </div>
                            </div>
                        {/each}     
                        <div class="flex flex-col">
                            <button on:click={addExpense} type="button" class="p-1 bg-gray-600 text-white m-2 rounded-md">
                                Add Expense
                            </button>
                        </div>
                    {:else}
                        <p>Generated List</p>
                    {/if}
                    <div class="flex flex-col">
                        <button class="m-2 p-2 text-white bg-black rounded" type="submit">Submit</button>
                    </div>
                </form>
            </div>

            <div class=" bg-white p-4 rounded my-6">
                {#if data.auth.budgets > 0}
                        <table>
                            <tbody>
                                <tr>
                                    <th>id</th>
                                    <th>budget-title</th>
                                    <th>budget-type</th>
                                    <th>status</th>
                                    <th>approvedBy</th>
                                    <th>createdAt</th>
                                    <th>updatedAt</th>
                                    <th>deletedAt</th>
                                    <th>deletedAt</th>
                                </tr>
                            {#each data.auth.budgets as budget}
                                <tr>
                                    <td>{budget.id}</td>
                                    <td>{budget.budgettitle}</td>
                                    <td>{budget.budgetname}</td>
                                    <td>{budget.status}</td>
                                    <td>{budget.email}</td>
                                    <td>{budget.approvedby}</td>
                                    <td>{budget.created_at}</td>
                                    <td>{budget.updated_at}</td>
                                    <td>{budget.deleted_at}</td>
                                    <td>
                                        <form action="?/updateBudget" method="post">
                                            <input name="userid" type="text" value={budget.budgetid} hidden={true} />
                                            <button type="submit" class="p-2 bg-black text-white rounded m-2">
                                            Update
                                        </button>
                                        </form>

                                        <form action="?/deleteBudget" method="post">
                                            <input name="userid" type="text" value={budget.budgetid} hidden={true} />
                                            <button type="submit" class="p-2 bg-black text-white rounded m-2">
                                            Delete
                                        </button>
                                        </form>


                                    </td>
                                </tr>
                            {/each}
                            </tbody>
                        </table>
                    {:else}
                        <p class="mx-auto text-center">No Data on Database yet</p>
                    {/if}
            </div>
    </div>
{:else}
    <div class="p-4 flex flex-col justify-center items-center h-screen bg-gray-300">
            <div class=" bg-white p-4 rounded">
                <div>
                    <h1>Form Testing</h1>
                    <h3 class="text-xl text-center font-bold">Create Buget & Approval Form</h3>
                </div>
            </div>

            <div class=" bg-white p-4 rounded my-6">
                <p>
                    Login to continue
                </p>
            </div>
    </div>
{/if}


<div class="p-4 flex flex-col justify-center items-center h-screen bg-gray-300">
        <div class=" bg-white p-4 rounded">
            <div>
                <h1>Form Testing</h1>
                <h3 class="text-xl text-center font-bold">Create Buget Template Form</h3>
            </div>
            {#if data.session}
                <form class="flex flex-col" action="?/registerBudget" method="post">
                    <div class="flex flex-col p-4">
                        <div class="flex flex-col border-b-1 p-3">
                            <label for="Catgegory Name">Budget Category</label>
                            <input name="budgetType" class="border p-1" type="text" id="firstname" />
                        </div>
                    <button type="button" class="expenseAdd p-1 m-2 text-white bg-black rounded">add</button>
                    </div>
                    <div id="expense_space">
                        <div class="flex flex-row items-end expenses">
                            <div class="flex flex-col border-b-1">
                                <label for="expense">Expense</label>
                                <input name="expenses" class="border p-1" type="text" id="expense" />
                            </div>
                            <button type="button" class="expenseRem p-1 mx-2 text-white bg-red-700 rounded">X</button>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <button class="m-2 p-2 text-white bg-black rounded" type="submit">Submit</button>
                    </div>
                </form>
            {:else}
                <p>Sign In To create Budget Template</p>
            {/if}
        </div>

        <div class=" bg-white p-4 rounded my-6">
        </div>
</div>