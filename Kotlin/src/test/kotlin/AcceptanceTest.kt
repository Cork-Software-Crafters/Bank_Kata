import com.nhaarman.mockito_kotlin.mock
import com.nhaarman.mockito_kotlin.verify
import org.jetbrains.spek.api.Spek
import org.jetbrains.spek.api.dsl.describe
import org.jetbrains.spek.api.dsl.it

object AcceptanceTest : Spek({

    describe("Account Service") {

        val console: Console = mock()
        val account = AccountService()

        it("should print statement containing all transactions") {
            account.deposit(1000)
            account.withdraw(100)
            account.deposit(500)

            account.printStatement()

            verify(console).printLine("DATE | AMOUNT | BALANCE")
            verify(console).printLine("10/04/2014 | 500 | 1400")
            verify(console).printLine("02/04/2014 | -100 | 900")
            verify(console).printLine("01/04/2014 | 1000 | 1000")
        }

    }

})
