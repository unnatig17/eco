public function up(): void
{
    Schema::create('issues', function (Blueprint $table) {
        $table->id('issue_id');
        $table->unsignedBigInteger('area_id')->nullable();
        $table->string('category')->nullable();
        $table->text('description');
        $table->string('status')->default('open');
        $table->string('reported_by')->nullable();
        $table->string('location')->nullable();
        $table->timestamps();
    });
}

public function down(): void
{
    Schema::dropIfExists('issues');
}
