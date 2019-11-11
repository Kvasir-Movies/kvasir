"""Add unique constraint to user/movie preference

Revision ID: 863518d37297
Revises: f2a97489889f
Create Date: 2019-03-30 13:49:54.047263

"""
from alembic import op


# revision identifiers, used by Alembic.
revision = "863518d37297"
down_revision = "f2a97489889f"
branch_labels = None
depends_on = None


def upgrade():
    op.create_unique_constraint(
        "user_and_external_movie", "movie_preferences", ["external_movie_id", "user_id"]
    )


def downgrade():
    op.drop_constraint("user_and_external_movie", "movie_preferences")
